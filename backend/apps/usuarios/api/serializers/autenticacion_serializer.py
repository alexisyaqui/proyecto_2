from django.utils.timezone import now
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import OutstandingToken
from apps.usuarios.models import Otp

from apps.usuarios.utils.enviar_email import enviar_opt_email, enviar_email_restablecimiento


Usuario = get_user_model()


class LoginTokenObtainSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError('Credenciales invalidas, email no existe')

        if not usuario.check_password(password):
            raise serializers.ValidationError(',La contraseña es invalida')

        if not usuario.is_active and usuario.estado:
            raise serializers.ValidationError('La cuenta esta desactivada')
        
        usuario.last_login = now()
        usuario.save(update_fields=['last_login'])
        data = super().validate({
            'email': usuario.email,
            'password': password
        })

        data.update({
            'nombre_usuario': usuario.nombre_usuario,
            'email': usuario.email
        })

        return data


class VerificarOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    codigo = serializers.CharField(max_length=6)

    def validate(self, attrs):
        try:
            usuario = Usuario.objects.get(email=attrs['email'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({'Email': 'Correo electronico no esta registrado'})

        otp_obj = Otp.objects.filter(
            usuario=usuario,
            codigo=attrs['codigo'],
            usado=False,
        ).order_by('-fecha_creacion').first()

        if not otp_obj or not otp_obj.es_valido():
            raise serializers.ValidationError({'codigo otp': 'Codigo invalido o ha sido expirado'})

        attrs['usuario'] = usuario
        attrs['otp_obj'] = otp_obj
        return attrs

    def save(self):
        otp_obj = self.validated_data['otp_obj']
        usuario = self.validated_data['usuario']

        otp_obj.usado = True
        otp_obj.save()

        usuario.email_verificado = True
        usuario.is_active = True
        usuario.estado = True
        usuario.save()

        return usuario


class ReenviarOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    def validate_email(self, value):

        if not value:
            raise serializers.ValidationError({'Email': 'Debes proporcionar un correo electronico'})


        try:
            usuario = Usuario.objects.get(email=value)
            self.context['usuario'] = usuario

        except Usuario.DoesNotExist:
            raise serializers.ValidationError({'Email': 'El correo electronico no existe'})
        return value

    def save(self):
        usuario = self.context.get('usuario')
        email = self.validated_data['email']

        if not usuario:
            raise serializers.ValidationError({'Email': 'No se pudo encontrar el usuario'})

        Otp.objects.filter(usuario=usuario, usado=False).update(usado=False)

        nuevo_codigo = Otp.generar_codigo()
        Otp.objects.create(
            usuario=usuario,
            codigo=nuevo_codigo,
            via='email',
        )

        return enviar_opt_email(email, nuevo_codigo)


class CambiarContrasenaSerializer(serializers.Serializer):
    contrasena_actual = serializers.CharField(required=True, write_only=True)
    nueva_contrasena = serializers.CharField(required=True, write_only=True)
    nueva_contrasena2 = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['nueva_contrasena'] != attrs['nueva_contrasena2']:
            raise serializers.ValidationError({'nueva_contrasena': 'Las contraseñas no coinciden'})

        usuario = self.context['request'].user
        if not usuario.check_password(attrs['contrasena_actual']):
            raise serializers.ValidationError({"contrasena_actual": 'La contraseña actual no coincide'})

        return attrs

    def save(self):

        usuario = self.context['request'].user
        usuario.set_password(self.validated_data['nueva_contrasena'])
        usuario.save()
        OutstandingToken.objects.filter(user=usuario).delete()

        return usuario


class OlvidarContrasenaSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        request = self.context.get('request')

        if not request:
            raise serializers.ValidationError("El contexto de la Solicitud no se proporciono")

        try:
            usuario = Usuario.objects.get(email=email)
            enviar_email_restablecimiento(usuario, request)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({'Email': 'Este correo electronico no esta registrado'})

        return attrs


class NuevaContrasenaSerializer(serializers.Serializer):
    uid = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
    re_new_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        re_new_password = attrs.get('re_new_password')

        if new_password != re_new_password:
            raise serializers.ValidationError({'Contraeña': 'Las contraseñas no coiniciden'})

        uid = attrs.get('uid')
        try:
            usuario_id = force_str(urlsafe_base64_decode(uid))
            self.usuario = Usuario.objects.get(pk=usuario_id)
        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            raise serializers.ValidationError({'url': 'Enlace de reestablecimiento es invalido'})

        token = attrs.get('token')
        if not default_token_generator.check_token(self.usuario, token):
            raise serializers.ValidationError({'token': 'El enlace de restablecimiento es invalido o ha expirado'})

        return attrs
    
    def save(self):
        new_password = self.validated_data['new_password']
        self.usuario.set_password(new_password)
        self.usuario.save()
        return self.usuario
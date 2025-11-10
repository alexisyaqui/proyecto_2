import re
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import ValidationError

from apps.usuarios.models import Usuario, Otp
from apps.usuarios.validators.validacion import validar_email, validar_telefono, validar_password_longitud
from apps.usuarios.utils.enviar_email import enviar_opt_email

Usuario = get_user_model()


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = [
            "nombre_usuario",
            "nombres",
            "apellidos",
            "telefono",
            "email",
            "password",
            "password2",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["nombre_usuario"].validators = [v for v in self.fields["nombre_usuario"].validators
            if not isinstance(v, UniqueValidator)
        ]
        self.fields["email"].validators = [
            v
            for v in self.fields["email"].validators
            if not isinstance(v, UniqueValidator)
        ]


    def validate_password(self, value):
        
        try:
            validar_password_longitud(value)
            
        except ValidationError as e:
            raise serializers.ValidationError(e.detail)

        return value

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("password2"):
            raise serializers.ValidationError({"password2": "Las contraseñas no coinciden"})
        return attrs


    def validate_nombre_usuario(self, value):
        usuario_id = self.instance.id if self.instance else None

        if Usuario.objects.filter(nombre_usuario=value).exclude(id=usuario_id).exists():
            raise serializers.ValidationError(
                f"Este nombre de usuario: {value} ya se encuentra en uso por otra persona"
            )
        return value

    def validate_email(self, value):
        email_limpio = validar_email(value)

        usuario_id = getattr(self.instance, "id", None)

        if Usuario.objects.filter(email=email_limpio).exclude(id=usuario_id).exists():
            raise serializers.ValidationError(
                f"El email {email_limpio}, ya esta en uso por otro usuario"
            )

        return email_limpio

    def validate_telefono(self, value):

        telefono_limpio = validar_telefono(value)
        usuario_id = getattr(self.instance, "id", None)

        if (
            Usuario.objects.filter(telefono=telefono_limpio)
            .exclude(id=usuario_id)
            .exists()
        ):
            raise serializers.ValidationError(
                f"El numero de telefono {telefono_limpio} ya esta registrado por otro usuario"
            )

        return telefono_limpio
    


    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.email_verificado = False
        usuario.telefono_verificado = False
        usuario.save()

        codigo = Otp.generar_codigo()
        Otp.objects.create(usuario=usuario, codigo=codigo)

        if not enviar_opt_email(usuario.email, codigo):
            usuario.delete()
            raise serializers.ValidationError(
                "No se pudo enviar el codigo de verificacion"
            )

        return usuario

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "nombre_usuario": instance.nombre_usuario,
            "nombres": instance.nombres,
            "apellidos": instance.apellidos,
            "telefono": instance.telefono,
            "email": instance.email,
            "password": instance.password,
            "estado": instance.estado,
            "admin": instance.is_superuser,
            "staff": instance.is_staff,
        }

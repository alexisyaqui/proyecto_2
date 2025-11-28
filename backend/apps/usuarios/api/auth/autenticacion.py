import logging
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from apps.usuarios.models import Otp
from apps.usuarios.utils.enviar_email import enviar_opt_email, enviar_otp_sms

from apps.usuarios.api.serializers.autenticacion_serializer import LoginTokenObtainSerializer, CambiarContrasenaSerializer
from apps.usuarios.api.serializers.token_serializer import TokenRefreshSerializer,TokenBlackListSerializer, AutenticacionSerializer

from apps.usuarios.api.serializers.autenticacion_serializer import (VerificarOTPSerializer, ReenviarOTPSerializer,
                                                                    OlvidarContrasenaSerializer, NuevaContrasenaSerializer)


Usuario = get_user_model()

logger = logging.getLogger(__name__)


class LoginTokenObtainPair(TokenObtainPairView):
    serializer_class = LoginTokenObtainSerializer

    def post(self, request, *args, **kwargs):
        # serializer = LoginTokenObtainSerializer(data=request.data)
        email = request.data.get('email', '').lower()
        cache_key = f"login_attempts_{email}"
        attempts = cache.get(cache_key, 0)

        if attempts >= 3:
            return Response({
                'error': 'Demasiados intentos',
                'detalle': 'Espere 3 minutos antes de intentar nuevamente'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        try:
            # if serializer.is_valid(raise_exception=True):
            response = super().post(request, *args, **kwargs)
            cache.delete(cache_key)

            return Response({
                'message': 'Inicio de sesion correcto',
                'data': response.data
            }, status=status.HTTP_200_OK)

        except InvalidToken:
            cache.set(cache_key, attempts + 1, timeout=180)
            logger.warning(f"Intento de loggin fallido: {email}")

            return Response({
                'error': 'Credenciales invalidas',
                'detalle': 'El correo electronico o la contraseña son incorrectos'
            }, status=status.HTTP_401_UNAUTHORIZED)

        except DjangoValidationError as e:
            return Response({
                'error': 'Datos invalidos',
                'detalle': 'El formato del correo electronico no es valido'
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f'Error interno en login : {e}')
            return Response({
                'error': 'Error interno del servidor',
                'detalle': 'No se pudo procesar la solucitud. Intentelo mas tarde'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TokenRefresView(APIView):
    permission_classes = [AllowAny]
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid(raise_exception=False):
            return Response({
                'ok': False,
                'message': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            tokens_data = serializer.save()
            return Response({
                'ok': True,
                'message': 'Token refrescado correctamente',
                'data': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Error en TokenFreshView: {str(e)}' )
            return Response({
                'ok': False,
                'message': 'Error interno del servidor',
                'errors': {'detail': str(e)}
                
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenBlackListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TokenBlackListSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={"request": request}
        )

        if not serializer.is_valid(raise_exception=False):
            return Response(
                {
                    "ok": False,
                    "message": "Error al cerrar sesion",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            resultado = serializer.save()

            logger.info(f"Usuario {request.user.id} cerro sesion ")

            return Response(
                {
                "ok": True, 
                 "message": "Sesion cerrada correctamente", 
                 "data": {},
                 }, status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.error(f'Error en TokenBlackListView: {str(e)}', exc_info=True)
            return Response(
                {
                    "ok": False,
                    "message": "Error al cerrar sesion",
                    "errors": {"detail": str(e)},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class AutenticacionView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AutenticacionSerializer

    def get(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data={}, context={"request": request})

            if not serializer.is_valid(raise_exception=False):
                return Response(
                    {
                        "ok": False,
                        "message": "Error al obtener los datos del usuario",
                        "data": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            logger.info(f"verificacion de autenticacion para: {request.user.email}")

            return Response(
                {
                    "ok": True,
                    "message": "Usuario autenticado correctamente",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.error(f"Error de autenticacionView: {str(e)}")

            return Response(
                {
                    "ok": False,
                    "message": "Error al verificar la autenticacion",
                    "errors": {"detail": str(e)},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SolicitarOTP(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        telefono = request.data.get('telefono')

        if not email:
            return Response({
                'error': 'Se requiere el email o telefono'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            if email:
                usuario = Usuario.objects.get(email=email)
                via = 'email'
            else:
                usuario = Usuario.objects.get(telefono=telefono)
                via = 'sms'
        except Usuario.DoesNotExist:
            return Response({
                'message': 'Si el email/telefono esta registrado, recibiras un codigo de verificacion'
            }, status=status.HTTP_200_OK)

        codigo = Otp.generar_codigo()
        otp_obj = Otp.objects.create(
            usuario=usuario,
            codigo=codigo,
            via=via
        )

        if via == 'email':
            exito = enviar_opt_email(usuario.email, codigo)
        else:
            exito = enviar_otp_sms(usuario.telefono, codigo)

        if not exito:
            return Response({
                'error': 'No se pudo enviar el codigo. Intentelo mas tarde'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            'message': 'El Codigo se ha enviado. Revise tu bandeja de entrada o SMS ',
            'usuario_id': usuario.id
        }, status=status.HTTP_200_OK)


class VerificarOTP(APIView):
    permission_classes = []

    def post(self, request):
        serializer = VerificarOTPSerializer(data=request.data)

        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({
                'ok': True,
                'message': 'Cuenta verificada, Ahora puedes iniciar sesion',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'ok': False,
            'message': 'Erro al enviar el codigo OTP',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ReenviarOTP(APIView):
    permission_classes = []

    def post(self, request):
        serializers = ReenviarOTPSerializer(data=request.data)
        if serializers.is_valid(raise_exception=False):
            serializers.save()
            return Response({
                    'message': 'Nuevo codigo enviado a su bandeja de entrada de su email',
                    'data': serializers.data
                }, status=status.HTTP_200_OK)
        else:
            return Response({
                    'message': 'Error al reenviar el codigo OTP', 
                    'errors': serializers.errors
                }, status=status.HTTP_400_BAD_REQUEST)

class CambiarContrasena(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CambiarContrasenaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({
                'message': 'Contraseña actualizada correctamente',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': "Error al actualizar la contraseña",
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class OlvidarContrasena(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = OlvidarContrasenaSerializer(data=request.data, context={'request':request})
        if serializer.is_valid(raise_exception=False):
            return Response({
                'message': 'Se ha generado un enlace, revise su correo electronico', 
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Error al reestablecer la contraseña',
            'errors': serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)

class NuevaContrasena(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        data={
            'uid': uidb64,
            'token': token,
            'new_password': request.data.get('new_password'),
            're_new_password': request.data.get('re_new_password'),
        }
        serializer = NuevaContrasenaSerializer(data=data)
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({
                'message': 'La contraseña ha sido restablecida con exito',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Error al reestableer la contraseña',
            'errors': serializer.errors,

        }, status=status.HTTP_400_BAD_REQUEST)

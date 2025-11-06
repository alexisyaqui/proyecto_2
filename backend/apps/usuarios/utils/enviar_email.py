from django.contrib.auth.tokens import default_token_generator
from django.contrib.messages.context_processors import messages
from django.core.mail import send_mail
from django.conf import settings
import logging

from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from jwt.utils import force_bytes

logger = logging.getLogger(__name__)

def enviar_opt_email(email, codigo):
    try:
        send_mail(
            subject='Tu codigo de verificación',
            message=f'Tu codigo OTP es {codigo}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )
        return True
    except Exception as e:
        logger.error(f'Error al enviar email a {email}: {str(e)}')


def enviar_otp_sms(telefono, codigo):
    "se agreaga el codigo del servicio twilo o vonage y otro"
    logger.info(f'OTP para {telefono}: {codigo} (simulado) ')

    return True


def enviar_email_restablecimiento(usuario, request):

    if not usuario or not usuario.pk:
        print(f"Error': El usuario con id {usuario.pk} no tiene una direccion de correo electronico" )

        return False

    if not usuario.email:
        print(f"Error: El usuario con ID {usuario.pk} no tiene una dirección de correo electrónico.")
        return False

    token = default_token_generator.make_token(usuario)
    uid = urlsafe_base64_encode(smart_bytes(usuario.pk))
    reset_url = f"{settings.FRONTEND_URL}/reestablecer-contrasena/{uid}/{token}/"
    subject = 'Reestablece tu contraseña'



    message = f"""
            Hola, {usuario.nombre_usuario}

            Recibimos una solicitud para reestablecer tu contraseña. Haz Clic en el enlace:

            {reset_url}

            si no solicitaste este cambio, ignora este email.

            el siguiente enlace expira en 24 horas
    """

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[usuario.email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"error al enviar el email: {usuario.email}: {e}")
        return False

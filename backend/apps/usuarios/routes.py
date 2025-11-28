from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from apps.usuarios.api.views.usuario_views import (
    UsuarioDetView,
    UsuarioLista,
    RegistroView,
)
from apps.usuarios.api.auth.autenticacion import (
    AutenticacionView,
    LoginTokenObtainPair,
    SolicitarOTP,
    TokenBlackListView,
    TokenRefresView,
    VerificarOTP,
    ReenviarOTP,
    CambiarContrasena,
    OlvidarContrasena,
    NuevaContrasena,
)

app_name = "usuarios"

urlpatterns = [
    # ==================== REGISTRO ====================
    path("registro/", RegistroView.as_view(), name="usuarios_activos"),  # ya
    path("login/", LoginTokenObtainPair.as_view(), name="login"),
    # ==================== OTP ====================
    path("verificar/otp/", VerificarOTP.as_view(), name="verificar_otp"),  # ya
    path("reenviar/otp/", ReenviarOTP.as_view(), name="reenviar_otp"),  # ya
    # ==================== CONTRASEÑA ====================
    path("olvidar-contrasena/", OlvidarContrasena.as_view(), name="olvidar_contrasena"),
    path(
        "reestablecer-contrasena/<str:uidb64>/<str:token>/",
        NuevaContrasena.as_view(),
        name="olvidar_contrasena",
    ),
    path("cambiar-contrasena/", CambiarContrasena.as_view(), name="cambiar_contrasena"),
    # ==================== AUTENTICACIÓN ====================
    path("autenticacion/", AutenticacionView.as_view(), name="autenticacion_vistas"),
    path("refrescar-token/", TokenRefresView.as_view(), name="refresh_token"),
    path("token-black-list/", TokenBlackListView.as_view(), name="token_black_list"),
    # ==================== CONSULTAS ====================
    path("usuario/activos/", UsuarioLista.as_view(), name="usuarios_activos"),
    path("usuario/detalle/<int:pk>/", UsuarioDetView.as_view(), name="usuarios"),
]

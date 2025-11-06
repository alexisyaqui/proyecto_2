from django.urls import path
from apps.usuarios.api.views.usuario_views import UsuarioDetView, UsuarioLista, RegistroView
from apps.usuarios.api.auth.autenticacion import (LoginTokenObtainPair, LogoutView, SolicitarOTP, VerificarOTP,
                                                  ReenviarOTP, CambiarContrasena, ResetearContrasena, NuevaContrasena )

app_name = 'usuarios'

urlpatterns = [
    path('usuario/activos/', UsuarioLista.as_view(), name='usuarios_activos'),
    path('usuario/registro/', RegistroView.as_view(), name='usuarios_activos'),
    path('usuario/detalle/<int:pk>/', UsuarioDetView.as_view(), name='usuarios'),

    path('login/', LoginTokenObtainPair.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),

    path('verificar/otp/', VerificarOTP.as_view(), name="verificar_otp"),
    path('reenviar/otp/', ReenviarOTP.as_view(), name="reenviar_otp"),

    path('cambiar-contrasena/', CambiarContrasena.as_view(), name="cambiar_contrasena"),
    path('olvidar-contrasena/', ResetearContrasena.as_view(), name="olvidar_contrasena"),
    path('reestablecer-contrasena/<str:uidb64>/<str:token>/', NuevaContrasena.as_view(), name="olvidar_contrasena"),

]

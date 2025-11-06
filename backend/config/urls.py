
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenVerifyView)
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django_scalar.views import scalar_viewer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.usuarios.routes')),
    path('api/token/', TokenRefreshView.as_view(), name="obtener_token"),
    path('refresh-token/', TokenRefreshView.as_view(), name="refres_token"),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', scalar_viewer, name='scalar-viewer'),

]


from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django_scalar.views import scalar_viewer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.usuarios.routes')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', scalar_viewer, name='scalar-viewer'),

]

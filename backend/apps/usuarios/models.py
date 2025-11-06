import random
import string

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from apps.bases.models import BaseModelo
from .managers import UsuarioPersonalizado
from django.utils import timezone



# Create your models here.
class Usuario(BaseModelo, AbstractBaseUser, PermissionsMixin):
    nombre_usuario = models.CharField(max_length=100, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    email_verificado = models.BooleanField(default=False)
    telefono_verificado = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre_usuario', 'nombres', 'apellidos', 'telefono']

    objects = UsuarioPersonalizado()

    def get_full_name(self):
        nombres_completos = self.nombres, ' ', self.apellidos
        return nombres_completos

    def __str__(self):
        return self.nombres

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class Otp(BaseModelo):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=6)
    usado = models.BooleanField(default=False)
    via = models.CharField(max_length=10, choices=[('email', 'Email'), ('sms', 'SMS')])

    def es_valido(self, minutos=5):
        ahora = timezone.now()
        return not self.usado and (ahora - self.fecha_creacion).total_seconds() < (minutos * 60)

    @classmethod
    def generar_codigo(cls):
        return ''.join(random.choices(string.digits, k=6))

    def __str__(self):
        return f'OTP para {self.usuario.email} {self.via}'
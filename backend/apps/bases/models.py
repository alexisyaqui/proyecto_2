from django.db import models
from time import timezone

# Create your models here.
class BaseModelo(models.Model):
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    fecha_eliminacion = models.DateTimeField(auto_now_add=True)
    #usuario_creador = models.ForeignKey('usuarios.Usuario', on_delete=models.PROTECT, related_name='%(class)s_creador', verbose_name='Creador por ')
    #usuario_modificador = models.ForeignKey('usuarios.Usuario', on_delete=models.SET_NULL, related_name='%(class)s_modificador', null=True, blank=True, verbose_name='Modificador por ')


    def soft_delete(self):
        if self.estado:
            self.estado = False
            self.fecha_eliminacion = timezone.now()
            self.save()

    def restaurar(self):
        if self.estado:
            self.estado = True
            self.fecha_modificacion = timezone.now()
            self.save()

    class Meta:
        abstract = True
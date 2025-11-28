from django.db import models
from time import timezone

# Create your models here.
class BaseModelo(models.Model):
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    fecha_eliminacion = models.DateTimeField(null=True, blank=True, verbose_name='fecha eliminacion')


    def soft_delete(self):
        if self.estado:
            self.estado = False
            self.fecha_eliminacion = timezone.now()
            self.save()

    def restaurar(self):
        if not self.estado:
            self.estado = True
            self.fecha_modificacion = timezone.now()
            self.fecha_eliminacion = None
            self.save()

    class Meta:
        abstract = True
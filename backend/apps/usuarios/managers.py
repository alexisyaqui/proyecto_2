from django.contrib.auth.models import BaseUserManager

class UsuarioPersonalizado(BaseUserManager):

    def create_user(self, nombre_usuario, nombres, apellidos, telefono, email, password=None, **extra_fields):
        if email is None:
            return ValueError(f'El email es obligatorio')
        if password is None:
            return ValueError(f'La Contraseña es obligatorio')

        email = self.normalize_email(email)
        user = self.model(
            nombre_usuario=nombre_usuario,
            nombres=nombres,
            apellidos=apellidos,
            telefono=telefono,
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nombre_usuario, nombres, apellidos, telefono, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener una cuenta personal.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener una cuenta personal.')

        return self.create_user(
            nombre_usuario=nombre_usuario,
            nombres=nombres,
            apellidos=apellidos,
            telefono=telefono,
            email=email,
            password=password,
            **extra_fields
        )
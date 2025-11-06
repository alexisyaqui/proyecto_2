from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import timezone
import hashlib

class TokenRestablecimiento(PasswordResetTokenGenerator):
    def _make_hash_value(self, usuario, timestamp):
        return str(usuario.pk) + str(timestamp) + str(usuario.is_active) + str(usuario.estado)


generador_token = TokenRestablecimiento()
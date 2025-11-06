import re
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError


def validar_email(value):
    if value is None or (isinstance(value, str) and value.strip() == ""):
        raise ValidationError("El email es obligatorio")
    
    email_limpio = value.strip().lower()
    
    
    patron_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if not re.match(patron_email, email_limpio):
        raise ValidationError("El formato del email no es valido. Ejemplo: usuario@gmail.com ")
    
    if '' in email_limpio:
        raise ValidationError("El correo electronico no puede tener espacios")
    
    return email_limpio

    
def validar_telefono(value):
    if value is None or (isinstance(value, str) and value.strip() == ""):
        raise ValidationError("El numero de telefono es obligatorio")
    
    numero_limpio = str(value).strip()
    
    
    if not numero_limpio.isdigit():
        raise ValidationError("El numero de telefono solo debe de contener numeros")
    
    if len(numero_limpio) != 8:
        raise ValidationError("El numero debe de tener exactamente 8 digitos")
    
    return numero_limpio



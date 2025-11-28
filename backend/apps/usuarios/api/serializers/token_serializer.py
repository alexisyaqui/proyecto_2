import logging
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


logger = logging.getLogger(__name__)


class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField(
        required=True,
        error_messages={
            "required": "El token de refresco es requerido",
            "blank": "El token de refresco no puede estar vacio",
        },
    )

    def validate_refresh(self, value):
        try:
            RefreshToken(value)
        except TokenError as e:
            logger.warning(f"Token de refresco invalido: {str(e)}")
            raise serializers.ValidationError("Token de resco invalido o expirado")
        return value

    def create(self, validated_data):
        try:
            refresh = RefreshToken(validated_data["refresh"])
            new_access = str(refresh.access_token)
            new_refresh = str(refresh)

            logger.info(f"Tokens refrescados correctamente")
            return {"access": new_access, "refresh": new_refresh}

        except TokenError as e:
            logger.warning(f"Error refrescando tokens: {str(e)}")

            raise serializers.ValidationError("Error al refrescar los tokens")


class TokenBlackListSerializer(serializers.Serializer):
    refresh = serializers.CharField(
        required=True,
        error_messages={
            "required": "El token de refresco es requerido",
            "blank": "El token de refresco no puede estar vacio",
        },
    )
    
    def validate_refresh(self, value):
        try:
            RefreshToken(value)
        except TokenError as e:
            logger.warning(f'Token de refresco invalido para blacklist: {str(e)}')
            raise serializers.ValidationError('Token de refreso invalido')
        
        return value
    
    def create(self, validated_data):
        try:
            token = RefreshToken(validated_data['refresh'])
            token.blacklist()
            logger.info('Refresh token invalidado correctamente')
            
            return {
                'message': 'Token invalidado correctamente'
            }
        except TokenError as e:
            logger.warning(f'Error al invalidar token: {str(e)}')
            raise serializers.ValidationError('Error al invalidar el token')

class AutenticacionSerializer(serializers.Serializer):
    user_id = serializers.SerializerMethodField()
    nombre_usuario = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    nombres = serializers.SerializerMethodField()
    apellidos = serializers.SerializerMethodField()
    
    
    def get_user_id(self, obj):
        return self.context['request'].user.id
    
    def get_nombre_usuario(self, obj):
        return self.context['request'].user.nombre_usuario
    
    def get_email(self, obj):
        return self.context['request'].user.email
    
    def get_nombres(self, obj):
        return self.context['request'].user.nombres
    
    def get_apellidos(self, obj):
        return self.context['request'].user.apellidos
    
    

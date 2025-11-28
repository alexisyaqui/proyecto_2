from rest_framework import serializers

class JWTErrorSerializer(serializers.Serializer):
    detalle = serializers.CharField(required=True)
    codigo = serializers.CharField(required=False, allow_blank=True)
    messages = serializers.ListField(child=serializers.DictField(), required=False)

    def valdiate_detalle(self, value):
        if not value or not isinstance(value, str):
            raise serializers.ValidationError('El campo detalle es obligatorio y debe ser texto ')
        
        return value
    
    def validated_codigo(self, value):
        codigo_valido = ['no_hay_token', 'token_expirado', 'token_invalido']
        if value and value not in codigo_valido:
            raise serializers.ValidationError(f'Codigo invalido: {value}')
        
        return value
    
    def validate_message(self, value):
        if value and not isinstance(value, list):
            raise serializers.ValidationError("El campo 'message' debe ser una lista")
        for msg in value:
            if not isinstance(msg, dict):
                raise serializers.ValidationError('Cada mensaje debe ser un diccionario')
            if "message" not in msg:
                raise serializers.ValidationError("Cada mensaje debe contener la clave 'message' ")
            
        return value
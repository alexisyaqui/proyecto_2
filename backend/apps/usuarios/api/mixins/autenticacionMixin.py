
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response


from apps.usuarios.api.serializers.jwtErrorSerializer import JWTErrorSerializer


class AutenticacionMixita():

    permission_classes = [IsAuthenticated]

    def handle_exception(self, exc):
        
        if isinstance(exc, (InvalidToken, TokenError)):
            refresh_token = self.request.headers.get('X-Refresh-Token')
            if refresh_token:
                try:
                    refresh = RefreshToken(refresh_token)
                    nuevo_access = str(refresh.access_token)
                    return Response({
                        'detalle': 'Access token expirado, se genero un nuevo access token',
                        'nuevo_access': nuevo_access
                    }, status=status.HTTP_200_OK)

                except TokenError:
                    return Response ({
                        'detalle': 'REfresh token invalido o expirado',
                    }, status=status.HTTP_401_UNAUTHORIZED)
                
            serializer =JWTErrorSerializer(data=exc.args[0])
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({'detalle': 'Token invalido'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return super().handle_exception(exc)

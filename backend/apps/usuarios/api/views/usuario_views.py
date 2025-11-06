from django.contrib.admin.templatetags.admin_list import pagination
from django.core.exceptions import ValidationError as DjangoValidacionError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import  status

from apps.usuarios.models import Usuario
from apps.usuarios.api.serializers.serializers import UsuarioSerializer
from apps.usuarios.utils.pagination import PaginacionPersonalizada


class UsuarioLista(APIView):

    def get(self, request):
        usuarios_activos = Usuario.objects.filter(estado=True)
        if not usuarios_activos:
            return Response({"message": "No hay registros de usuarios activos"}, status=status.HTTP_400_BAD_REQUEST)

        paginator = PaginacionPersonalizada()
        paginated_queryset = paginator.paginate_queryset(usuarios_activos, request)

        serializer = UsuarioSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response({
            "message": "Usuarios activos",
            "data": serializer.data
        })
        # return Response({"message": "Usuarios activos", "data": serializer.data, }, status=status.HTTP_200_OK)

class RegistroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'message': 'Usuario creado con exito',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            'message': 'Error al crear el usuario',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class UsuarioDetView(APIView):
    def get(self, request, pk=None):
        try:
            usuario = get_object_or_404(Usuario, pk=pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Error al obtener el usuario.", "detalle": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):

        try:
            usuario = get_object_or_404(Usuario, pk=pk)
        except Exception:
            return Response({
                "error": "Usuario no encontrado",
            }, status=status.HTTP_400_BAD_REQUEST)

        if not (request.user == usuario or request.user.is_staff):
            return  Response({
                "error": "No tienes los permisos para realizar esta modificacion"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            seriarilzer = UsuarioSerializer(usuario, data=request.data, partial=True)
            if seriarilzer.is_valid():
                seriarilzer.save()
                return Response({
                    "message": "Usuario modificado exitosamente",
                    "data": seriarilzer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Error al actualizar el usuario",
                    "errors": seriarilzer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except DjangoValidacionError as e:
            return Response(
            {'error': "Error de validacion, revise detenidamente", "detalle":str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response({
                'error': "Error interno del servidor", "detalle":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk=None):
        usuario =get_object_or_404(Usuario, pk=pk)

        if not (request.user==usuario or request.user.is_staff):
            return Response({
                'message': "No tienes permisos para realizar esta acción"
            }, status=status.HTTP_403_FORBIDDEN)

        if not usuario.is_active and not usuario.estado:
            return Response({
                'message': 'El usuario ya ha sido eliminado, o no existe'
            }, status=status.HTTP_400_BAD_REQUEST)

        usuario.estado = False
        usuario.is_active = False
        usuario.save()
        return Response({
            "message": "Usuario eliminado exitosamente",
        }, status=status.HTTP_200_OK)



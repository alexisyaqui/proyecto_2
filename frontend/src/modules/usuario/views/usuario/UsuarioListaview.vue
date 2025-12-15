<template>

  <div class="w-full bg-indigo-100 flex items-center justify-center min-h-full p-2 ">
    <div class="w-full items-center justify-center">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">

        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-800">Modulo de Usuarios</h2>
              <p class="text-gray-500 mt-1">Administre a los miembros de su equipo y sus permisos de cuenta aquí.</p>
            </div>
            <div class="mt-4 md:mt-0">
              <button
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                Agregar usuario
              </button>
            </div>
          </div>

          <!-- filtros y busquedas -->
          <div class="mt-6 flex flex-col sm:flex-row gap-4 ">
            <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input type="text" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
                placeholder="Buscar usuario">
            </div>


            <select class="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto">
              <option value="">Todos los usuarios</option>
              <option value="engineering">Activos</option>
              <option value="design">Inactivos</option>
              <option value="marketing">Roles</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>

        <!-- Vista de la tabla -->

        <UsuariosTable 
        :usuarios="usuarios?.resultados.data || []"
        :loading="isLoading"
        @editar="abrirModalEditar"
        @eliminar="confirmarEliminar"
        />
        
        <!-- Vista del loader -->
        <template>
          <Loaders :show="isLoading" label="Cargando Usuarios" />
        </template>

        <!-- Vista del modal -->
        <EditarUsuarioModal 
        v-model:isOpen="modalAbierto" 
        :usuario="usuarioSeleccionado"
        @usuario-editado="handleUsuarioEditado" 
        />



      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { useToast } from '@/modules/composables/use.Toast';
import { computed, ref } from 'vue';
import Loaders from '@/modules/components/Loaders.vue';
import { getUsuarioActivosAction } from '../../actions';


import EditarUsuarioModal from '../../components/EditarUsuarioModal.vue';
import type { EditarUsuario, ListaUsuarios, UsuarioLista } from '../../interfaces';
import { eliminarUsuarioAction } from '../../actions/eliminar-usuario.action';
import SearchIcon from '@/modules/components/icons/SearchIcon.vue';
import UsuariosTable from '../../components/UsuariosTable.vue';


//composables
const {success, error: toastError} = useToast();

const queryClient = useQueryClient();

//obtener usuarios
const { data: usuarios, isLoading} = useQuery<ListaUsuarios>({
  queryKey: ['usuarios'],
  queryFn: () => getUsuarioActivosAction({ previous: 1, next: 10 }),
})


//estados del modal y actualizar usuario
const modalAbierto = ref(false);
const usuarioSeleccionado = ref<EditarUsuario>({
  id: 0,
  nombre_usuario: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: ''
});


const abrirModalEditar = (usuario: UsuarioLista) => {
  usuarioSeleccionado.value = {
    id: usuario.id,
    nombre_usuario: usuario.nombre_usuario,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    email: usuario.email,
    telefono: usuario.telefono
    
  }
  modalAbierto.value = true;
};

const handleUsuarioEditado = (usuarioActualizado: any) => {
  queryClient.setQueryData<ListaUsuarios>(['usuarios'], (oldData) => {
    if (!oldData) return oldData;

    const newData = { ...oldData };
    const index = newData.resultados.data.findIndex(u => u.id === usuarioActualizado.id);
    if (index !== -1) {
      newData.resultados.data[index] = usuarioActualizado; // ✅ Todo el objeto actualizado
    }
    return newData;
  });
  success('Usuario actualizado');
};


//eliminar usuario

const eliminarMutation = useMutation({
  mutationFn: (id: number) => eliminarUsuarioAction(id),
  onSuccess: (result, id) => {
    if (result.ok) {
      success(result.message);

      queryClient.setQueryData<ListaUsuarios>(['usuarios'], (oldData) => {
        if (!oldData) return oldData;

        const newData = { ...oldData };
        const usuarioIndex = newData.resultados.data.findIndex(u => u.id === id);

        if (usuarioIndex !== -1) {
          const usuario = newData.resultados.data[usuarioIndex];
          newData.resultados.data[usuarioIndex] = {
            ...usuario,
            estado: false,
            fecha_eliminacion: new Date().toISOString(),
          } as UsuarioLista;
        }

        return newData
      })


    } else {
      toastError(result.message);
    }
  },
  onError: () => {
    toastError('Error al eliminar el usuario')
  }

})

const confirmarEliminar = (id: number) => {
  if (confirm('¿Está seguro de eliminar este usuario?')) {
    eliminarMutation.mutate(id);
  }
};

</script>

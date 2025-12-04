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

  
          <div class="mt-6 flex flex-col sm:flex-row gap-4 ">
            <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input type="text" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
                placeholder="Search members...">
            </div>
            <div>
              <select class="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto">
                <option value="">Todos los usuarios</option>
                <option value="engineering">Activos</option>
                <option value="design">Inactivos</option>
                <option value="marketing">Roles</option>
                <option value="sales">Sales</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-200 text-xs">
              <tr>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Nombre de usuario
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Apellidos
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  telefono
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Staff
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Admin
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Fecha Creacion
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Ultimo Inicio Sesion
                </th>


                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Fecha Modificacion
                </th>
                <th scope="col"
                  class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Fecha Eliminacion
                </th>
                <th scope="col" class="px-1 py-0.5 text-right text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>

            </thead>

            <tbody class="bg-white divide-gray-200 leading-tight">
              <tr>
                <td v-if="!usuarios" colspan="7" class="text-center py-2 px-1">
                  <Loaders :show="!usuarios" label="Cargando Usuarios" />
                </td>
              </tr>
              <tr v-for="usuario in usuarios?.resultados.data" :key="usuario.id"
                class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <!-- Imagen Tabla -->
                    <ImagenTabla />
                    <div class="ml-4">
                      <div class="text-sm font-semibold text-gray-900">{{ usuario.nombre_usuario }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-normal text-gray-900">{{ usuario.nombres }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-normal text-gray-900">{{ usuario.apellidos }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full font-normal bg-green-100 text-green-800">
                    {{ usuario.telefono }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl">
                  <span class="px-2 font-normal inline-flex text-xs leading-5 font-semibold ">
                    {{ usuario.email }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="usuario.estado ? 'font-bold text-green-600' : 'font-bold text-red-600'">
                    {{ usuario.estado ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="usuario.staff ? 'font-bold text-green-600' : 'font-bold text-red-600'">
                    {{ usuario.staff ? 'Si' : 'No' }}

                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="usuario.admin ? 'font-bold text-green-600' : 'font-bold text-red-600'">
                    {{ usuario.admin ? 'Si' : 'No' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ new Date(usuario.fecha_creacion).toLocaleString() }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ new Date(usuario.last_login).toLocaleString() }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="usuario.fecha_eliminacion ? 'px-2 inline-flex text-sm leading-5 rounded-full bg-green-100 text-green-800' : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-700'">
                    {{ usuario.fecha_modificacion
                      ? new Date(usuario.fecha_modificacion).toLocaleString()
                      : 'No' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="usuario.fecha_eliminacion ? 'text-red-600 font-bold text-sm ' : 'text-gray-600 font-bold text-sm'">
                    {{ usuario.fecha_eliminacion ? `${new Date(usuario.fecha_modificacion).toLocaleString()}` : 'No' }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-center">

                  <button 
                  @click="abrirModal(usuario)"
                  :loading="eliminarMutation.isPending"
                    class="p-2  rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center"
                    >
                    <EditIcon />

                  </button>
                  <button 
                  @click="confirmarEliminar(usuario.id)"
                  :loading="eliminarMutation.isPending"
                  class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center"
                    
                    :class="{ 'opacity-50 cursor-not-allowed': eliminarMutation.isPending }">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- ✅ Modal fuera del bucle: solo una instancia -->
          <EditarUsuarioModal v-model:isOpen="modalAbierto" :usuario="usuarioSeleccionado"
            @usuario-editado="handleUsuarioEditado" />

        </div>
      </div>
    </div>

  </div>



</template>


<script setup lang="ts">

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { useToast } from '@/modules/composables/use.Toast';
import { ref } from 'vue';
import Loaders from '@/modules/components/Loaders.vue';
import { getUsuarioActivosAction } from '../../actions';



import EditIcon from '@/modules/components/icons/EditIcon.vue';
import DeleteIcon from '@/modules/components/icons/DeleteIcon.vue';
import EditarUsuarioModal from '../../components/EditarUsuarioModal.vue';
import ImagenTabla from '../../components/ImagenTabla.vue';
import type { EditarUsuario, ListaUsuarios, UsuarioLista } from '../../interfaces';
import { eliminarUsuarioAction } from '../../actions/eliminar-usuario.action';



defineProps<{
  loading?: boolean
}>();

const { error: toastError, success } = useToast()

const queryClient = useQueryClient();

//obtener usuarios
const { data: usuarios, isLoading, isError, error } = useQuery<ListaUsuarios>({
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


const abrirModal = (usuario: EditarUsuario) => {
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



/**

  └── usuarios/
        ├── UsuarioListView.vue          ← Orquestador
        └── components/
            ├── UsuariosTable.vue        ← Tabla
            ├── EditarUsuarioModal.vue   ← Modal de edición
            └── UsuarioActions.vue       ← (opcional) botones de acción reutilizables

UsuariosTable.vue
UsuarioListView.vue


*/
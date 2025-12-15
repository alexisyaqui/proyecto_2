<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-200 text-xs">
        <tr>
          <th scope="col" v-for="columnas in columns" :key="columnas.key"
          class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
            {{ columnas.label }}
          </th>
        
        </tr>

      </thead>

      <tbody class="bg-white divide-gray-200 leading-tight">
        <tr v-if="!usuarios.length">
          <td :colspan="columns.length" class="text-center py-4">
            <slot>No hay usuarios</slot>
          </td>

        </tr>
        <tr v-for="usuario in usuarios" :key="usuario.id" 
        class="hover:bg-gray-50 transition-colors duration-150">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">

              <ImagenTabla />
              <div class="ml-4">
                <div class="text-sm font-semibold text-gray-900">
                  {{ usuario.nombre_usuario }}
                </div>
              </div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-normal text-gray-900">
              {{ usuario.nombres }}
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-normal text-gray-900">
              {{usuario.apellidos }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full font-normal bg-green-100 text-green-800">

              {{ usuario.email }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-2xl">
            <span class="px-2 font-normal inline-flex text-xs leading-5 font-semibold ">
              {{ usuario.telefono }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span :class="usuario.estado ? 'bg-emerald-100 text-emerald-600 rounded-full font-bold' : 'bg-rose-100 text-rose-600 rounded-full font-bold'">
                {{ usuario.estado ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span :class="usuario.admin ? 'bg-purple-100 text-purple-600 rounded-full font-semibold' : 'bg-gray-100 rounded-full text-gray-500'">
              {{ usuario.admin ? 'Si' : 'No' }}

            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span :class="usuario.staff ? 'font-bold rounded-full text-green-600' : 'bg-gray-100 rounded-full text-gray-800'">
              {{ usuario.staff ? 'Si' : 'No' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ formatFecha(usuario.last_login) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ formatFecha(usuario.fecha_creacion)}}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center">
            <span :class="usuario.staff ? 'bg-emerald-100 text-sm font-bold rounded-full text-green-600' : 'bg-amber-100 text-sm font-bold rounded-full text-amber-500'"> 
              {{ formatFecha(usuario.fecha_modificacion) }}

            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center">
            <span :class="usuario.fecha_eliminacion ? 'text-red-600 font-bold text-sm ' : 'text-gray-600 font-bold text-sm'">
              {{ formatFecha(usuario.fecha_eliminacion  ) }}

            </span>
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-center">

            <button @click="onEditar(usuario)"
              class="p-2  rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center">
              <EditIcon />

            </button>
            <button @click="onEliminar(usuario)"
              class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center">
              <DeleteIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>


  </div>
</template>


<script setup lang="ts">
import EditIcon from '@/modules/components/icons/EditIcon.vue';
import type { UsuarioLista } from '../interfaces';
import ImagenTabla from './ImagenTabla.vue';
import DeleteIcon from '@/modules/components/icons/DeleteIcon.vue';

const props = defineProps<{
  usuarios: UsuarioLista[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'editar', usuario: UsuarioLista): void;
  (e: 'eliminar', id: number): void;
}>();

const columns = [
  {'key': 'usuario', label: 'Nombre de usuario'},
  {'key': 'nombres', label: 'Nombres'},
  {'key': 'apellidos', label: 'Apellidos'},
  {'key': 'email', label: 'email'},
  {'key': 'telefono', label:'Telefono'},
  {'key': 'estado', label: 'Estado Usuario'},
  {'key': 'admin', label: 'Admin'},
  {'key': 'staff', label: 'Staff'},
  {'key': 'last_login', label: 'Ultimo Inicio Sesion'},
  {'key': 'fecha_creacion', label: 'Fecha Creacion'},
  {'key': 'fecha_modificacion', label: 'Fecha Modificacion'},
  {'key': 'fecha_eliminacion', label: 'Fecha Eliminacion'},
  {'key': 'acciones', label: 'Acciones'}
];


const formatFecha = (fecha: string | null) => {
  return fecha ? new Date(fecha).toLocaleString() : null;
}


const onEditar = (usuario: UsuarioLista) => emit('editar', usuario)
const onEliminar = (usuario: UsuarioLista) => emit('eliminar', usuario.id)


</script>
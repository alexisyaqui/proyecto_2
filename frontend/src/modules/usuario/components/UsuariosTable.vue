<!-- src/views/usuarios/components/UsuariosTable.vue -->
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-200 text-xs">
        <tr>
          <th v-for="col in columns" :key="col.key" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-gray-200">
        <tr v-if="!usuarios?.length">
          <td :colspan="columns.length" class="text-center py-4">
            <slot name="empty">No hay usuarios</slot>
          </td>
        </tr>
        <tr v-for="usuario in usuarios" :key="usuario.id" class="hover:bg-gray-50">
          <td class="px-6 py-4">
            <div class="flex items-center">
              <ImagenTabla />
              <div class="ml-4">
                <div class="text-sm font-semibold">{{ usuario.nombre_usuario }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">{{ usuario.nombres }}</td>
          <td class="px-6 py-4">{{ usuario.apellidos }}</td>
          <td class="px-6 py-4">
            <span class="px-2 bg-green-100 text-green-800 rounded-full text-xs">
              {{ usuario.telefono }}
            </span>
          </td>
          <td class="px-6 py-4">{{ usuario.email }}</td>
          <td class="px-6 py-4">
            <span :class="usuario.estado ? 'text-green-600' : 'text-red-600'" class="font-bold">
              {{ usuario.estado ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td class="px-6 py-4">{{ usuario.staff ? 'Sí' : 'No' }}</td>
          <td class="px-6 py-4">{{ usuario.admin ? 'Sí' : 'No' }}</td>
          <td class="px-6 py-4">{{ formatFecha(usuario.fecha_creacion) }}</td>
          <td class="px-6 py-4">{{ formatFecha(usuario.last_login) }}</td>
          <td class="px-6 py-4">{{ formatFecha(usuario.fecha_modificacion) || 'No' }}</td>
          <td class="px-6 py-4">{{ formatFecha(usuario.fecha_eliminacion) || 'No' }}</td>
          <td class="px-6 py-4 text-center">
            <button @click="onEditar(usuario)" class="p-2 rounded-full hover:bg-indigo-100">
              <EditIcon />
            </button>
            <button @click="onEliminar(usuario)" class="p-2 ml-2 rounded-full hover:bg-red-100">
              <DeleteIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EditIcon from '@/modules/components/icons/EditIcon.vue';
import DeleteIcon from '@/modules/components/icons/DeleteIcon.vue';
import ImagenTabla from '@/modules/usuario/components/ImagenTabla.vue'
import type { UsuarioLista } from '../interfaces';

const props = defineProps<{
  usuarios: UsuarioLista[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'editar', usuario: UsuarioLista): void;
  (e: 'eliminar', id: number): void;
}>();

const columns = [
  { key: 'usuario', label: 'Nombre de usuario' },
  { key: 'nombres', label: 'Nombres' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'estado', label: 'Estado' },
  { key: 'staff', label: 'Staff' },
  { key: 'admin', label: 'Admin' },
  { key: 'fecha_creacion', label: 'Fecha Creación' },
  { key: 'last_login', label: 'Último Inicio' },
  { key: 'fecha_modificacion', label: 'Modificación' },
  { key: 'fecha_eliminacion', label: 'Eliminación' },
  { key: 'acciones', label: 'Acciones' },
];

const formatFecha = (fecha: string | null) => {
  return fecha ? new Date(fecha).toLocaleString() : null;
};

const onEditar = (usuario: UsuarioLista) => emit('editar', usuario);
const onEliminar = (usuario: UsuarioLista) => emit('eliminar', usuario.id);
</script>
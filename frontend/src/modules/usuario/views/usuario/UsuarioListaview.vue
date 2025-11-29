<template>
  <div class="w-full bg-indigo-100 flex items-center justify-center min-h-full p-2 ">
    <div class="w-full items-center justify-center">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Table Header -->
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

          <!-- Search and Filter -->
          <div class="mt-6 flex flex-col sm:flex-row gap-4">
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
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Nombre de usuario
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Apellidos
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  telefono
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Staff
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Admin
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Fecha Creacion
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Ultimo Inicio Sesion
                </th>


                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
                  Fecha Modificacion
                </th>
                <th scope="col" class="px-1 py-0.5 text-center text-xs font-bold text-gray-950 uppercase tracking-wider">
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

              <!-- Row 1 -->
              <InfoTabla :usuarios="usuarios" />

            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <PaginacionTabla />

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import { useQuery } from '@tanstack/vue-query';
import PaginacionTabla from '../../components/PaginacionTabla.vue';

import InfoTabla from '../../components/InfoTabla.vue';
import type { ListaUsuarios } from '@/modules/authentication/interfaces';
import { useToast } from '@/modules/composables/use.Toast';
import { watchEffect } from 'vue';
import Loaders from '@/modules/components/Loaders.vue';
import { getUsuarioActivosAction } from '../../actions';


const { error: toastError, success } = useToast()

const { data: usuarios, isLoading, isError, error } = useQuery<ListaUsuarios>({
  queryKey: ['usuarios'],
  queryFn: () => getUsuarioActivosAction({ previous: 1, next: 10 }),
})

let shownSuccess = false

watchEffect(() => {
  if (isError && error.value) {
    const message = error.value instanceof Error ? error.value.message : 'Error desconocido'
    toastError(message)
  }

  if (usuarios.value && !isLoading.value && !shownSuccess) {
    success('Usuarios cargado correctamente')
    shownSuccess = true
  }
})


</script>
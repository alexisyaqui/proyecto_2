<template>

  <div class="container max-w-6xl">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Table Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Usuarios</h2>
            <p class="text-gray-500 mt-1">Listado de Usuarios Activos</p>
          </div>
          <div class="mt-4 md:mt-0">
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              Add Member
            </button>
          </div>
        </div>

        <!-- Search and Filter -->
        <TableFiltros />

      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <TableThead/>


          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Row 1 -->
            <TableRow

            v-for="usuario in usuario"
            :key="usuario.id"
            :usuario="usuario"
            
            />


          </tbody>
        </table>
      </div>

      <TablePaginacion />
    </div>
  </div>

</template>

<script setup lang="ts">



interface Props{
  usuario: UsuarioLista[]

}


const props = defineProps<Props>();





</script>

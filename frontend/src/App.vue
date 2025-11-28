<template>

  <SidebarProvider>
    <RouterView />
    <VueQueryDevtools />
  </SidebarProvider>


</template>


<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'



import { onMounted } from 'vue';
import { useAuthstore } from './modules/auth/store/auth.store';
import {useSidebarProvider} from '@/modules/dashboard/composables/useSidebar';

const authStatus = useAuthstore()

onMounted(() => {
  if (authStatus.access && authStatus.isTokenExpirado) {
    authStatus.limpiarToken()
  }
})


</script>
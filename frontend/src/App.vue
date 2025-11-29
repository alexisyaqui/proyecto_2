<template>


    <RouterView />
    <VueQueryDevtools />



</template>


<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'



import { onMounted } from 'vue';
import { useAuthstore } from './modules/authentication/store/auth.store';


const authStatus = useAuthstore()

onMounted(() => {
  if (authStatus.access && authStatus.isTokenExpirado) {
    authStatus.limpiarToken()
  }
})


</script>
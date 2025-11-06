<template>
    <aside class="mx-auto max-w-md overflow-hidden rounded-xl bg-gray-100 shadow-md md:max-w-2xl">
        <div class="p-1">
            <img src="../../../assets/img/logos/logo_.png"
            class="w-24 h-24 rounded-full object-cover shadow-md"
            alt="Logo">
            <RouterLink to="/" class="block px-4 py-2 mx-4 rounded-xl drop-shadow-2xl bg-indigo-100 text-xl text-black font-bold hover:bg-indigo-500 text-center hover:shadow-md transition-duration-200 ">Dashboard</RouterLink>
        </div>

        <div class="border-b border-indigo-950 mx-4 py-2"></div>

        <nav class="p-4 space-y-2">
            <RouterLink to="/" class="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-shadow-gray-950 hover:bg-sky-500 hover:text-white ">Configuraciones</RouterLink>
        </nav>

    </aside>
    
</template>

<script setup lang="ts">

</script>
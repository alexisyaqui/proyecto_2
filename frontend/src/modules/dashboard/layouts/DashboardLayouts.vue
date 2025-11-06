<template>
    <div>
        <div class="flex h-screen bg-gray-100">
            <SidebarComp />

            <div class="flex-1 flex-col">
                <NavBarComp />

                <main class="p-6 overflow-y-auto">
                    <router-view />

                </main>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SidebarComp from '../components/SidebarComp.vue';
import NavBarComp from '../components/NavBarComp.vue';


</script>
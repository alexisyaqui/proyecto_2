<template>
  <div v-if="show"
  class="fixed inset-0 flex items-center justify-center bg-gray/80 z-10">
    <div class="flex flex-col items-center">
      <!-- spinner -->
      <svg class="w-20 h-20 animate-spin text-indigo-700" viewBox="0 0 30 30">
        <circle class="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span v-if="label"
        class=" animate-pulse text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black">
        {{ label }}</span>
    </div>
  </div>
</template>


<script setup lang="ts">


interface Props {
  show?: boolean;
  label: string;

}



defineProps<Props>()
</script>

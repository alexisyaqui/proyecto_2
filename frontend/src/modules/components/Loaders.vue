<template>
  <Transition name="fade">
    <div v-if="show" class="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
        <div class="flex items-start gap-3">
          <div class="shrink-0">
            <svg class="size-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm text-blue-800 font-semibold">
              Confirmando datos...
            </h3>
            <p class="text-sm text-blue-700 mt-1">
              Se está confirmando sus datos para iniciar sesión.
            </p>
          </div>
        </div>
        
        <div class="flex justify-center mt-4">
          <div class="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span class="sr-only">{{ label }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  show?: boolean;
  label?: string;
  minimumDuration?: number; // Tiempo mínimo en ms
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  label: 'Cargando',
  minimumDuration: 2000 // 2 segundos por defecto
});

const isVisible = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null
let showTimestamp: number | null = null

watch(() => props.show, (newValue) => {
  if (newValue) {
    // Mostrar inmediatamente
    isVisible.value = true
    showTimestamp = Date.now()
    
    // Limpiar timeout anterior si existe
    if (hideTimeout) {
      clearTimeout(hideTimeout)
    }
  } else {
    // Calcular cuánto tiempo ha estado visible
    const elapsedTime = showTimestamp ? Date.now() - showTimestamp : 0
    const remainingTime = Math.max(0, props.minimumDuration - elapsedTime)
    
    // Ocultar después del tiempo restante
    hideTimeout = setTimeout(() => {
      isVisible.value = false
      showTimestamp = null
    }, remainingTime)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
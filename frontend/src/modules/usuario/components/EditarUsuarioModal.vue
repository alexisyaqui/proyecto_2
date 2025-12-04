
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <h3>Editar Usuario</h3>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nombre de usuario:</label>
            <input v-model="form.nombre_usuario" type="text" required />
          </div>

          <div class="form-group">
            <label>Nombres:</label>
            <input v-model="form.nombres" type="text" required />
          </div>

          <div class="form-group">
            <label>Apellidos:</label>
            <input v-model="form.apellidos" type="text" required />
          </div>

          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.email" type="email" required />
          </div>

          <div class="form-group">
            <label>Teléfono:</label>
            <input v-model="form.telefono" type="text" required />
          </div>

          <!-- Errores de validación -->
          <div v-if="errors" class="alert alert-danger">
            <ul>
              <li v-for="(mensajes, campo) in errors" :key="campo">
                <strong>{{ campo }}:</strong>
                {{ mensajes.join(', ') }}
              </li>
            </ul>
          </div>

          <!-- Mensaje de éxito o error general -->
          <div v-if="message" :class="`alert alert-${messageType}`">
            {{ message }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="cerrarModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="btn-primary">
              {{ loading ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { editarUsuarioAction } from '../actions';

interface EditarUsuario {
  id: number;
  nombre_usuario: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string
}


interface Props {
    isOpen: boolean;
    usuario: EditarUsuario;

}

const props = withDefaults(defineProps<Props> (), {
    isOpen: false
})


const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void
    (e: 'usuarioEditado', usuario: EditarUsuario): void
}>()

const form = ref<EditarUsuario>({...props.usuario})
const loading = ref(false);
const message = ref('')
const messageType = ref<'success' | 'danger'>('success');
const errors = ref<Record<string, string[]> | null>(null);

watch(
    () => props.usuario, 
    (nuevoUsuario) => {
    form.value = {...nuevoUsuario};
    message.value = '';
    errors.value = null;
}, {
    immediate: true
}
)



const cerrarModal = () => {
    emit('update:isOpen', false);
}


const handleSubmit = async () => {
    loading.value = true;
    message.value = '';
    errors.value = null;

    const result = await editarUsuarioAction(form.value)

    if(result.ok) {
        messageType.value = 'success';
        message.value = result.message;
        emit('usuarioEditado', form.value);

        setTimeout(() => {
            cerrarModal();
        }, 1000)
    } else {
        messageType.value ='danger';
        message.value = result.message;
        if(result.errors){
            errors.value = result.errors
        }
    }

    loading.value = false
}


</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.alert {
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
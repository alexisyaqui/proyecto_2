<template>
    <div>
        <Loaders :show="loading" label="Iniciando sesion" />
    </div>
    <div class="w-full justify-center px-1 py-8 bg-white rounded-4xl shadow-lg shadow-sky-950/60 ">

        <div class="m">
            <h2 class="mt-1 text-center text-2xl/1 font-bold tracking-tight text-indigo-900 ">Inicio de Sesion</h2>
            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center " src="../" alt="yaxy" />
            </div>

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onLogin">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Correo Electronico:</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" autocomplete="email" v-model="myForm.email"
                            ref="emailInputRef"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Contraseña:</label>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" autocomplete="current-password"
                            v-model="myForm.password" ref="passwordInputRef"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">Iniciar
                        sesion</button>
                </div>
            </form>

            <div class="mb-3 text-md py-4 px-2">
                <label class="flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox text-indigo-600"
                ref="myForm.remember" checked />
                <span class="font-medium text-gray-600">Recuerdame</span>
              </label>
                
            </div>

            <div class="flex flex-2 w-full">
                <div>
                    <RouterLink to="/registro"
                        class="w-full flex px-5 rounded-2xl  text-center text-sm font-semibold text-blue-950 transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-950 focus:ring-offset-2">
                        Si aun no cuentas con usuario registrate aqui.
                    </RouterLink>
                </div>

                <div >
                    <RouterLink to="/olvidar/contrasena"
                        class="w-full flex px-5 rounded-2xl text-center text-sm font-semibold text-blue-950 transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-950 focus:ring-offset-2">
                        Olvidaste tu Contraseña
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthstore } from '@/modules/auth/store/auth.store';
import { useToast } from '@/modules/composables/use.Toast';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import Loaders from '@/modules/components/Loaders.vue';

const router = useRouter()

const { success, error } = useToast()
const authStore = useAuthstore();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null)

const loading = ref(false)

const myForm = reactive({
    email: '',
    password: '',
    remember: false
})

const onLogin = async () => {

    if (myForm.email === '') {
        return emailInputRef.value?.focus();
    }

    if (myForm.password === '') {
        return passwordInputRef.value?.focus();
    }

    if (myForm.remember) {
        localStorage.setItem('email', myForm.email)

    } else {
        localStorage.removeItem('email')
    }

    loading.value = true


    const result = await authStore.login(myForm.email, myForm.password)
    if (result.success) {
        success(result.message);



        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

    } else {
        error(result.message)
    }
    loading.value = false
};

watchEffect(() => {
    const email = localStorage.getItem('email')

    if (email) {
        myForm.email = email
        myForm.remember = true
    }
})





</script>

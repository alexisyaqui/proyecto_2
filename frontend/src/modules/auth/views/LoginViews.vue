<template>
    <div
        class="w-full max-w-4xl mx-auto p-4 justify-center px-1 py-12 bg-white rounded-4xl shadow-lg shadow-sky-950/60 ">

        <div class="m">
            <h2 class="mt-1 text-center text-2xl/1 font-bold tracking-tight text-indigo-900 ">Inicio de Sesion</h2>
            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center "
                    src="../../../assets/img/logos/illustration.svg" alt="yaxy" />
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
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ingresar</button>
                </div>
            </form>

            <div class="mb-3 text-md p-4 px-4">
                <input type="checkbox" class="mb-4 px-2 appearance-auto indeterminate:bg-indigo-800"
                    ref="myForm.remember">Recuerdame
            </div>

            <div class="text-md">
                <RouterLink to="/registro" class="font-semibold text-indigo-600 hover:text-indigo-500"> Si no tienes un
                    usuario, Registrate aqui.</RouterLink>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthstore } from '../store/auth.store';
import { useToast } from '@/modules/composables/use.Toast';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const { success, error } = useToast()
const authStore = useAuthstore();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null)



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


    const result = await authStore.login(myForm.email, myForm.password)
    if (result.success) {
        success('Inicio de sesion correctamente');



        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

    } else {
        error(result.message ?? 'Error desconocido');
    }
};

watchEffect(() => {
    const email = localStorage.getItem('email')

    if (email) {
        myForm.email = email
        myForm.remember = true
    }
})


</script>

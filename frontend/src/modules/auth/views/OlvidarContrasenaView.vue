<template>
    <div
        class="w-full max-w-4xl mx-auto justify-center px-0 py-2 bg-white rounded-4xl shadow-md hover:shadow-xl transition-shadow">

        <div class="m">
            <div class="py-5 px-5 rounded-2xl">
                <h1 class="text-3xl font-bold text-indigo-900 drop-shadow-lg text-center shadow-indigo-950 ">Olvidaste tu Contraseña</h1>
            </div>

            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center "
                    src="../../../assets/img/logos/olvi-contrasena.png" alt="yaxy" />
            </div>

        </div>

        <form class="max-w-2xl mx-5 my-2" @submit.prevent="onOlvidarContrasena">
            <p class="text-wrap text-blue-950 dark:text-sky-900">Ingrese su correo electrónico para reestablecer la Contraseña de su cuenta:</p>

            <div class="bg-gray-50 rounded-md p-4 mb-6">
                <input type="email" 
                class="block w-full rounded-md text-md font-bold text-center text-indigo-600 placeholder:text-md placeholder:text-indigo-00 rounder p-2 "
                    placeholder="Ingrese su Email" v-model="myForm.email">

                <div v-if="errores.email">
                    <span v-for="msg in errores.email" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                </div>
            </div>


            <div class="px-30 py-4 flex justify-center">
                <button type="submit"
                    class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Reestablecer Contraseña</button>
            </div>
        </form>

    </div>

</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthstore } from '../store/auth.store';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useToast } from '@/modules/composables/use.Toast';



const olvidarContrasenaResponseStore = useAuthstore()
const { success, error } = useToast()

const route = useRoute()
const errores = reactive<Record<string, string[]>>({})


const codigoInputRef = ref<HTMLInputElement | null>(null)



const myForm = reactive({
    email: ''
})


const onOlvidarContrasena = async () => {
    
    Object.keys(errores).forEach((key) => delete errores[key])

    if (myForm.email == '') {
        return codigoInputRef.value?.focus()
    }


    const otpComponente = await olvidarContrasenaResponseStore.olvidarContrasenaResponse(
        myForm.email,
    )
    if (otpComponente.ok) {
        success(otpComponente.message)

        setTimeout(() => {
            router.push('/login')
        }, 3000)
    }

    if (otpComponente.errors) {
        Object.assign(errores, otpComponente.errors)

        for (const [campo, mensajes] of Object.entries(otpComponente.errors)) {
            setTimeout(() => {
                mensajes.forEach((msg) => error(`${msg}`))
            })
        }
    }
}



</script>

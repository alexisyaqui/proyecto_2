<template>

    <Loaders 
    :show="showLoader"
    label="Redirigiendo al inicio de sesion"
    />
    <div
        class="w-full max-w-4xl mx-auto justify-center px-0 py-2 bg-white rounded-4xl shadow-md hover:shadow-xl transition-shadow">

        <div class="m">
            <div class="py-5 px-5 rounded-2xl">
                <h1 class="text-3xl font-bold text-indigo-900 drop-shadow-lg text-center shadow-indigo-950 ">Ingrese su
                    Nueva Contraseña</h1>
            </div>

            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center "
                    src="../../../assets/img/logos/olvi-contrasena.png" alt="yaxy" />
            </div>

        </div>

        <form class="max-w-2xl mx-5 my-2" @submit.prevent="onNuevaContrasena">
            <p class="text-wrap text-blue-950 dark:text-sky-900 text-center">Ingrese su nueva contraseña:</p>

            <div>
                <div class="flex items-center justify-between">
                    <label for="new_password" class="block text-sm/6 font-medium text-gray-900">Nueva
                        Contraseña:</label>
                </div>

                <div class="mt-2">
                    <input type="password" v-model="myForm.new_password" ref="new_passwordInputRef"
                        placeholder="Ingrese su contraseña"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    <span v-if="errores.new_password" class="text-sm text-red-600 mt-1 block">{{ errores.new_password[0]
                        }}</span>
                    <span v-if="errores.token" class="text-sm text-red-600 mt-1 block">{{ errores.token[0] }}</span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="re_new_password" class="block text-sm/6 font-medium text-gray-900">Confirme su Nueva
                        Contraseña:</label>
                </div>
                <div class="mt-2">
                    <input type="password" v-model="myForm.re_new_password" ref="re_new_passwordInputRef"
                        placeholder="Confirme su nueva contraseña"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    <span v-if="errores.re_new_password" class="text-sm text-red-600 mt-1 block">{{
                        errores.re_new_password[0] }}</span>

                </div>
            </div>



            <div class="px-30 py-4 flex justify-center">
                <button type="submit"
                    class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Nueva Contraseña</button>
            </div>
        </form>

    </div>

</template>

<script setup lang="ts">
import { useToast } from '@/modules/composables/use.Toast';
import { useAuthstore } from '@/modules/auth/store/auth.store';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import Loaders from '@/modules/components/Loaders.vue';

const nuevaContrasenaStore = useAuthstore()
const { success, error } = useToast()
const route = useRoute()

const errores = reactive<Record<string, string[]>>({})

const showLoader = ref(false)

const new_passwordInputRef = ref<HTMLInputElement | null>(null)
const re_new_passwordInputRef = ref<HTMLInputElement | null>(null)

const myForm = reactive({
    uidb64: '',
    token: '',
    new_password: '',
    re_new_password: ''
})

const uidb64 = route.params.uidb64 as string
const token = route.params.token as string

const onNuevaContrasena = async () => {
    Object.keys(errores).forEach((key) => delete errores[key])

    const nuevaContrasenaComp = await nuevaContrasenaStore.nuevaContrasenaResponse(
        uidb64,
        token,
        myForm.new_password,
        myForm.re_new_password,

    )

    if (nuevaContrasenaComp.ok) {
        success(nuevaContrasenaComp.message)
        showLoader.value = true
        
        setTimeout(() => {
            router.push({name: 'login'})
        }, 3000)
    } else {
        if (nuevaContrasenaComp.errors) {
            showLoader.value = false
            Object.assign(errores, nuevaContrasenaComp.errors)

            for (const [campo, mensajes] of Object.entries(nuevaContrasenaComp.errors)) {
                mensajes.forEach((msg) => error(`${msg}`))
            }
        } else {
            success(nuevaContrasenaComp.message)
        }
    }

}

</script>

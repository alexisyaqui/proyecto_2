<template>
    <div
        class="w-full max-w-4xl mx-auto p-4 justify-center px-1 py-12 bg-white rounded-4xl shadow-lg shadow-sky-950/10 ">

        <div class="m">
            <div class="py-5 px-5 rounded-2xl">
                <h1 class="text-3xl font-bold text-indigo-900 drop-shadow-lg text-center shadow-indigo-950">Verificacion Codigo OTP</h1>
            </div>

            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center "
                    src="../../../assets/img/logos/otp.svg" alt="yaxy" />
            </div>

        </div>


        <form class="max-w-2xl mx-5 my-2" @submit.prevent="onVerificarOtp">
            <p class="text-wrap text-blue-950 dark:text-sky-900">Ingrese el codigo (OTP) de seis (6) digitos para
                verificación
                de la cuenta:</p>



            <div class="bg-gray-50 rounded-md p-4 mb-6">
                <input type="text" class="block w-full rounded-md text-4xl font-bold text-center text-indigo-600 "
                    placeholder="0000000" v-model="myForm.codigo" @keypress="soloNumeros" maxlength="6">

                <div v-if="errores.codigo">
                    <span v-for="msg in errores.codigo" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                </div>
            </div>


            <div class="px-30 py-4 flex justify-center">
                <button type="submit"
                    class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Verificar
                    Cuenta</button>
            </div>
        </form>
        <p class="mt-2 text-sm text-wrap text-center text-blue-950 dark:text-sky-900">
            Si no lo has recibido en tu correo electrónico, haz clic para reenviarlo.
        </p>
        <div class="px-30 py-1">

            <button @click.prevent="onReenviarOtp" type="button"
                class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">

                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m4-4v4m0 0l-2-2m2 2l2-2" />
                </svg>
                <span>Reenviar código OTP</span>
            </button>

        </div>

    </div>

</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthstore } from '../store/auth.store';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useToast } from '@/modules/composables/use.Toast';


const otpStore = useAuthstore()
const { success, error } = useToast()

const route = useRoute()
const errores = reactive<Record<string, string[]>>({})


const codigoInputRef = ref<HTMLInputElement | null>(null)



const myForm = reactive({
    email: route.query.email as string || '',
    codigo: null,
})

const soloNumeros = (e: KeyboardEvent) => {
    const char = String.fromCharCode(e.keyCode || e.which)
    if (!/^\d$/.test(char)) {
        e.preventDefault()
    }

    const input = e.target as HTMLInputElement
    if (input.value.length >= 6) {
        e.preventDefault()
    }
}

const onVerificarOtp = async () => {
    const codigoEntero = parseInt(myForm.codigo as unknown as string)

    Object.keys(errores).forEach((key) => delete errores[key])

    if (myForm.codigo == '') {
        return codigoInputRef.value?.focus()
    }


    const otpComponente = await otpStore.verificarOtpResponse(
        myForm.email, codigoEntero
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


const onReenviarOtp = async () => {

    const reenviarOtpComponente = await otpStore.reenviarOtpResponse(myForm.email)

    if (reenviarOtpComponente.ok) {
        success(reenviarOtpComponente.message)
        setTimeout(() => {
            router.push({ query: { email: myForm.email } })
        })
        

        if (reenviarOtpComponente.errors) {

            Object.assign(errores, reenviarOtpComponente.errors)

            for (const [campo, mensajes] of Object.entries(reenviarOtpComponente.errors)) {
                setTimeout(() => {
                    mensajes.forEach((msg) => error(`${msg}`))
                })
            }
        }
    }
}

</script>

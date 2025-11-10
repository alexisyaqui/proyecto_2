<template>
    <div
        class="w-full max-w-4xl mx-auto p-4 justify-center px-1 py-12 bg-white rounded-4xl shadow-lg shadow-sky-950/10 ">

        <div class="m">
            <div class="bg-indigo-700 py-5 px-5 rounded-2xl">
                <h1 class="text-3xl font-bold text-white text-center shadow-gray-700">Verificacion Codigo OTP</h1>
            </div>

            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center "
                    src="../../../assets/img/logos/otp.svg" alt="yaxy" />
            </div>

        </div>

        <div class="max-w-2xl mx-auto my-2 bg-white rounded-lg shadow-md overflow-hidden">
            <form class="max-w-2xl mx-5 my-2" @submit.prevent="onVerificarOtp">
                <p class="text-gray-700 mb-6 font-medium">Ingrese el codigo (OTP) de seis (6) digitos para verificación
                    de la cuenta:</p>



                <div class="bg-gray-50 rounded-md p-4 mb-6">
                    <input type="text" class="block w-full rounded-md text-4xl font-bold text-center text-indigo-600 "
                        placeholder="codigo de 6 digitos" v-model="myForm.codigo" @keypress="soloNumeros" maxlength="6">

                    <div v-if="errores.codigo">
                        <span v-for="msg in errores.codigo" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                    </div>
                </div>


                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-lg font-extrabold text-white shadow-lg hover:bg-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900">Verificar
                        Cuenta</button>
                </div>
            </form>
        </div>

        <div class="py-0 px-8">
            <button @click.prevent="onReenviarOtp" 
            type="button" 
            class="flex w-full justify-center px-3 py-5 text-sm font-bold text-black-950 focus-visible:outline-2
            "  >Reenvia
                el codigo OTP si no has recibido en tu correo electronico</button>
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
const {success, error} = useToast()

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

const onVerificarOtp = async () =>{
    const codigoEntero = parseInt(myForm.codigo as unknown as string)
    
    Object.keys(errores).forEach((key) => delete errores[key])

    if(myForm.codigo == ''){
        return codigoInputRef.value?.focus()
    }

    
    const otpComponente = await otpStore.verificarOtpResponse(
        myForm.email, codigoEntero
    )
    if(otpComponente.ok){
        success(otpComponente.message)
        
        setTimeout(() => {
            router.push('/login')
        }, 3000)
    }

    if(otpComponente.errors){
        Object.assign(errores, otpComponente.errors)

        for(const [campo, mensajes] of Object.entries(otpComponente.errors)){
            setTimeout(() => {
                mensajes.forEach((msg) => error(`${msg}`))
            })
        }
    }
}


const onReenviarOtp = async () => {

    const reenviarOtpComponente = await otpStore.reenviarOtpResponse(myForm.email)

    if(reenviarOtpComponente.ok){
        success(reenviarOtpComponente.message)
        setTimeout(() => {
            router.push({query: {email: myForm.email }})
        })

        if(reenviarOtpComponente.errors){
            Object.assign(errores, reenviarOtpComponente.errors)

            for (const [campo, mensajes] of Object.entries(reenviarOtpComponente.errors)){
                setTimeout(() => {
                    mensajes.forEach((msg) => error(`${msg}`))
                })
            }
        }
    }
}

</script>    

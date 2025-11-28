<template>
    <div
        class="w-full max-w-4xl mx-auto p-4 justify-center px-1 py-12 bg-white rounded-4xl shadow-lg shadow-sky-950/60 ">
        
        <div class="m">
            <h2 class="mt-1 text-center text-2xl/1 font-bold tracking-tight text-indigo-900 ">Registre sus datos</h2>
            <div class="flex justify-center mt-5">
                <img class="w-38 h-38 object-cover rounded-4xl flex justify-center " src="../../../assets/img/logos/illustration.svg" alt="yaxy" />
            </div>
        </div>

        <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">

            <form class="space-y-6" @submit.prevent="onRegistro">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="">
                        <label for="p_nombre" class="block text-sm/6 font-medium text-gray-900">Nombres:</label>
                        <div class="mt-2">
                            <input type="p_nombre" name="p_nombre" id="p_nombre" autocomplete="p_nombre" placeholder="Nombres completos" v-model="myForm.Nombres" ref="nombresInputRef"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                <div v-if="errores.nombres">
                                    <span v-for="msg in errores.nombre" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                        </div>
                    </div>

                    <div>
                        <label for="apellidos" class="block text-sm/6 font-medium text-gray-900">Apellidos:</label>
                        <div class="mt-2">
                            <input type="apellidos" name="apellidos" id="apellidos" autocomplete="apellidos" placeholder="Apellidos completos" v-model="myForm.apellidos" ref="apellidosInputRef"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                                        <div v-if="errores.apellidos">
                                    <span v-for="msg in errores.apellidos" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>

                    <div>
                        <label for="nombre_usuario" class="block text-sm/6 font-medium text-gray-900">Nombre de usuario:</label>
                        <div class="mt-2">
                            <input type="nombre_usuario" name="nombre_usuario" id="nombre_usuario" 
                                autocomplete="nombre_usuario" placeholder="Nombre de usuario" v-model="myForm.nombre_usuario" ref="nombre_usuarioInputRef"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                <div v-if="errores.nombre_usuario">
                                    <span v-for="msg in errores.nombre_usuario" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>


                    <div>
                        <label for="telefono" class="block text-sm/6 font-medium text-gray-900">Numero de telefono:</label>
                        <div class="mt-2">
                            <input type="text" name="telefono" id="telefono" autocomplete="telefono" placeholder="Ingrse numero telefono" v-model="myForm.telefono" ref="telefonoInputRef"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                <div v-if="errores.telefono">
                                    <span v-for="msg in errores.telefono" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>

                    <div class="md:col-span-2">
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Correo Electronico:</label>
                        <div class="mt-2">
                            <input type="email" name="email" id="email" autocomplete="email" placeholder="Ingrese un Correo electronico" v-model="myForm.email" ref="emailInputRef"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                <div v-if="errores.email">
                                    <span v-for="msg in errores.email" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Contraseña:</label>
                        </div>

                        <div class="mt-2">
                            <input type="password" name="password" id="password" autocomplete="current-password" placeholder="Ingrese su contraseña" v-model="myForm.password"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                <div v-if="errores.password">
                                    <span v-for="msg in errores.password" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password2" class="block text-sm/6 font-medium text-gray-900">Confirmar Contraseña:</label>
                        </div>
                        <div class="mt-2">
                            <input type="password" name="password" id="password" autocomplete="current-password2" placeholder="Confirme su contraseña" v-model="myForm.password2"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            
                                <div v-if="errores.password2">
                                    <span v-for="msg in errores.password2" :key="msg" class="text-red-600 text-sm">{{ msg }}</span>
                                </div>
                            </div>
                    </div>

                </div>

                <div>
                    <button type="submit"
                    class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >Registrarse</button>
                </div>
            </form>


            <div class="mt-5 text-center">
                <RouterLink to="/login" class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white px-4 py-3 text-sm font-semibold text-blue-950 shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"> Si ya tienes usuario inicia sesion aqui.
                    </RouterLink>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { useAuthstore } from '@/modules/auth/store/auth.store';
import { useToast } from '@/modules/composables/use.Toast'
import { useRouter } from 'vue-router';


const nombre_usuarioInputRef = ref<HTMLInputElement | null>(null)
const nombresInputRef = ref<HTMLInputElement | null>(null)
const apellidosInputRef = ref<HTMLInputElement | null>(null)
const emailInputRef = ref<HTMLInputElement | null>(null)
const telefonoInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLIFrameElement | null>(null)
const password2InputRef = ref<HTMLIFrameElement | null>(null)

const registroStore = useAuthstore()

const {success, error} = useToast()
const errores = reactive<Record<string, string[]>>({})

const router = useRouter()

const myForm = reactive({
    nombre_usuario:'',
    Nombres:'',
    apellidos:'',
    email:'',
    telefono:'',
    password:'',
    password2:''
})


const onRegistro = async () => {
    Object.keys(errores).forEach((key) => delete errores[key])

    if(myForm.nombre_usuario === ''){
        return nombre_usuarioInputRef.value?.focus()
    }

    if(myForm.Nombres === ''){
        return nombresInputRef.value?.focus()
    }

    if(myForm.apellidos === ''){
        return apellidosInputRef.value?.focus()
    }

    if(myForm.email === ''){
        return emailInputRef.value?.focus()
    }

    if(myForm.telefono === ''){
        return telefonoInputRef.value?.focus()
    }

    if(myForm.password === ''){
        return passwordInputRef.value?.focus()
    }

    if (myForm.password2 === ''){
        return password2InputRef.value?.focus()
    }

    if (myForm.password !== myForm.password2){
        (errores.password2 = ["Las contraseñas no coinciden"])
  
    }

    const registrocompenente = await registroStore.registroStore(

        myForm.nombre_usuario, 
        myForm.Nombres,
        myForm.apellidos,
        myForm.email,
        myForm.telefono,
        myForm.password,
        myForm.password2
    )

    if(registrocompenente.ok){
        success(registrocompenente.message)
        setTimeout(() => {
            router.push({name: 'verificarOtp', query: {email: myForm.email}})
        }, 3000)
    }

    if(registrocompenente.errors){
        Object.assign(errores, registrocompenente.errors);

        for (const [campo, mensajes] of Object.entries(registrocompenente.errors)){
            setTimeout(() =>{
                mensajes.forEach((msg) => error(`${msg}`))
            }, 3000)
        }
    }
}

watchEffect(() => {
  delete errores.email
  delete errores.password2
  delete errores.telefono


  if(myForm.password && myForm.password2 && myForm.password !== myForm.password2){
    errores.password2 = ['Las contraseñas no coinciden']
  }

  if (myForm.email && !myForm.email.includes('@')) {
    errores.email = ["El correo debe contener @"]
  }


  if(myForm.telefono == ''){
    errores.telefono=['El numero de telefono no puede estar vacio']

  }
})


</script>
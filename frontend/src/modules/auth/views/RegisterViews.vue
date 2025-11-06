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

            <form class="space-y-6" @submit.prevent="">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="">
                        <label for="p_nombre" class="block text-sm/6 font-medium text-gray-900">Nombres:</label>
                        <div class="mt-2">
                            <input type="p_nombre" name="p_nombre" id="p_nombre" autocomplete="p_nombre" placeholder="Nombres completos"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                        </div>
                    </div>

                    <div>
                        <label for="apellidos" class="block text-sm/6 font-medium text-gray-900">Apellidos:</label>
                        <div class="mt-2">
                            <input type="apellidos" name="apellidos" id="apellidos" autocomplete="apellidos" placeholder="Apellidos completos" 
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        
                            </div>
                    </div>

                    <div>
                        <label for="nombre_usuario" class="block text-sm/6 font-medium text-gray-900">Nombre de usuario:</label>
                        <div class="mt-2">
                            <input type="nombre_usuario" name="nombre_usuario" id="nombre_usuario" 
                                autocomplete="nombre_usuario" placeholder="Nombre de usuario"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        
                            </div>
                    </div>


                    <div>
                        <label for="telefono" class="block text-sm/6 font-medium text-gray-900">Numero de telefono:</label>
                        <div class="mt-2">
                            <input type="text" name="telefono" id="telefono" autocomplete="telefono" placeholder="Ingrse numero telefono"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                            </div>
                    </div>

                    <div class="md:col-span-2">
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Correo Electronico:</label>
                        <div class="mt-2">
                            <input type="email" name="email" id="email" autocomplete="email" placeholder="Ingrese un Correo electronico"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                            </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Contraseña:</label>
                        </div>
                        <div class="mt-2">
                            <input type="password" name="password" id="password" autocomplete="current-password" placeholder="Ingrese su contraseña" 
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                            </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password2" class="block text-sm/6 font-medium text-gray-900">Confirmar Contraseña:</label>
                        </div>
                        <div class="mt-2">
                            <input type="password" name="password2" id="password2" autocomplete="current-password2" placeholder="Confirme su contraseña" 
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                    </div>

                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm/6 font-extrabold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
                </div>
            </form>


            <div class="mt-5 text-center">
                <RouterLink to="/login" class="font-bold text-blue-900 hover:text-indigo-200 pointer-events-auto"> Si ya tienes usuario inicia sesion. 
                    <p class="font-extrabold text-md text-indigo-700 hover:text-indigo-200 pointer-events-auto uppercase">aqui</p></RouterLink>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

</script>
<template>
    <div
        class="w-full max-w-4xl mx-auto p-4 justify-center px-1 py-12 bg-white rounded-4xl shadow-lg shadow-sky-950/60 ">
        <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">

            <form class="space-y-6" >

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


                </div>

                <div>
                    <button type="submit"
                    class="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >Guardar cambios</button>
                </div>
            </form>
        </div>
    </div>
</template>



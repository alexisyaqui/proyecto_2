import type { App } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'




const options: Partial<ToastContainerOptions> = {
    autoClose: 3000,
    position: 'top-right',
    theme: 'light',
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
} as ToastContainerOptions

export const setupToastify = (app: App) => {
    app.use(Vue3Toastify, options)
}
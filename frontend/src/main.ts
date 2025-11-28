import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import { setupToastify } from './modules/plugins/toastify';
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(setupToastify)
app.use(VueQueryPlugin)



app.mount('#app')
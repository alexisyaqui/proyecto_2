import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import { setupToastify } from './modules/plugins/toastify';

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupToastify(app)

app.mount('#app')

import axios from "axios";


const apidjango = axios.create({
    baseURL: import.meta.env.VITE_DJANGO_API_URL
})

export {apidjango}


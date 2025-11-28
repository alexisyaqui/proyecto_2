import { useAuthstore } from "@/modules/auth/store/auth.store";
import router from "@/router";
import axios from "axios";



const apidjango = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_API_URL,
  timeout: 10000,
});

let isRefresh = false
let failedQueue: any[] = []


const processQueue = (error: any, access: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(access)
    }
  })
  failedQueue = []
}


// Interceptor para añadir el access token en cada request
apidjango.interceptors.request.use((config) => {
  const access = localStorage.getItem('access')

  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }

  return config
})



apidjango.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefresh) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((access) => {
            originalRequest.headers.Authorization = `Bearer ${access}`

            return apidjango(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefresh = true

      try {
        const refreshToken = localStorage.getItem('refresh');

        // Si no hay refresh token, ir directo al logout
        if (!refreshToken) {
          throw new Error('No hay token de refresco valido');
        }

        const { data } = await apidjango.post('/refrescar-token/', {
          refresh: refreshToken,
        })

        const newAccess = data.access
        localStorage.setItem('access', newAccess)

        apidjango.defaults.headers.Authorization = `Bearer ${newAccess}`


        const authStatus = useAuthstore()
        authStatus.access = newAccess;

        processQueue(null, newAccess)

        return apidjango(originalRequest)

      } catch (err) {

        processQueue(err, null)
        // aquí puedes redirigir al login si el refresh falla

        const authStatus = useAuthstore()
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('usuario')
        localStorage.removeItem('email')


        authStatus.limpiarToken()

        await authStatus.logout()

        if (router.currentRoute.value.name !== 'login') {
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.value.fullPath,
              reason: 'Sesion_expired'
            }
          });
        }

        return Promise.reject(err)
      } finally {
        isRefresh = false;
      }
    }

    return Promise.reject(error)
  }
);



export { apidjango }


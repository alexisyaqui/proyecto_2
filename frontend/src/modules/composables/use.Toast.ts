import {toast} from 'vue3-toastify'



export const useToast = () => {
    const success = (msg: string) => toast.success(msg)
    const error = (msg: string) => toast.error(msg)
    const info = (msg: string) => toast.info(msg)
    const warning = (msg: string) => toast.warning(msg)

    return {success, error, info, warning}
}
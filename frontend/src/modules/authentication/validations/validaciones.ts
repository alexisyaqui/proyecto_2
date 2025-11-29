export function isRequired(value: string | null | undefined): string | true {
    if (value || value?.trim() === ''){
        return 'Este campo es requerido'
    }
    return true
} 

export function ValidarEmail(value: string | null | undefined ): string | true {
    if(!value || value.trim() === ''){
        return 'El correo electronico es obligatorio'
    }

    const email = value.trim().toLocaleLowerCase()

    if (email.includes(' ')){
        return 'El correo electronico no puede tener espacios'
    }

    const pattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}
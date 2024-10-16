import { FormEvent,  useState } from 'react'
import { TipoUsuario } from '../types/constants'
import {  useNavigate } from "react-router-dom";

export const useRegister = () =>{
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<TipoUsuario>({
        name: '',
        email: '',
        password: ''
    })
    // Estado para almacenar los datos que vienen del fetch
const [datos, setDatos] = useState<{ tiposUsuario: TipoUsuario[] }>({ tiposUsuario: [] });


//funcion que se ejecuta cuando se manda el formulario
const onSubmit = async (evento: FormEvent<HTMLFormElement> ): Promise<void> =>{
    evento.preventDefault()
    try {
        const res = await fetch('http://localhost:3000/api/Register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        });
        if(!res.ok){
            throw new Error(`http error status: ${res.status}` )
        }
        const data = await res.json()
        setDatos(data.message)
        navigate('login')
    } catch (error) {
        console.error('Erro de fetching datos', error)
    }
}

const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evento.target;
    setFormValues({
        ...formValues,
        [name]: value
    })
}


return {datos, onSubmit, handleChange, formValues}
}
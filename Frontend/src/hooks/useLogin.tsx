import { Login } from "@/types/constants"
import {  FormEvent, useState } from "react"
import { useNavigate } from "react-router"

export const useLogin = () =>{
    const navigate= useNavigate()
    const [datos, setData] = useState<string>('')
    const [formLogin, setFormLogin] = useState<Login>({
        email: '',
        password: ''
    })
    const onSubmit = async (evento: FormEvent<HTMLFormElement>): Promise<void> => {
        evento.preventDefault();
        try {
          const res = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formLogin),
          });

        
      
          if (!res.ok) {
            const errorData = await res.json();  // Intentar capturar el mensaje de error
            console.log('Error data:', errorData);
            throw new Error(`http fetch login error: ${res.status}, message: ${errorData.message}`);
          }
      
          const data = await res.json();
          setData(data.message);
          localStorage.setItem('access_token', data.token);
          navigate('/dashboard');
        } catch (error) {
          console.error('Error en el fetch:', error);
        }
      };
      
    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = evento.target
        setFormLogin({
            ...formLogin,
            [name]: value,
        })
    }
    

    return { datos, onSubmit, handleChange, formLogin }
}
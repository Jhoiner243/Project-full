'use client'
import {useLogin} from '../src/hooks/useLogin'
import { Button } from "../src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../src/components/ui/card"
import { Input } from "../src/components/ui/input"
import { Label } from "../src/components/ui/label"


export const Login = () =>{
    const { handleChange, onSubmit, formLogin} = useLogin()
    
    return(
        <div>
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inicio de sesion</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
        <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formLogin.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formLogin.password || ''}
                onChange={handleChange}
                required
              />
            </div>
            </CardContent>
            <CardFooter>
            <Button type="submit" className="w-full">Registrarse</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
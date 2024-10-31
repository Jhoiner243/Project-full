import { type Request, type Response } from 'express';
import * as validator from 'validator';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../prisma/index';
import { LoginRequest } from 'src/constants';

// Función para generar el token
const generarToken = (userId: number) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const LoginPOST = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: LoginRequest = req.body;

        // Validar el formato de email
        if (!validator.isEmail(email)) {
            res.status(400).json({ message: 'Correo electrónico inválido' });
            return;
        }

        // Buscar el usuario en la base de datos
        const validUser = await db.user.findUnique({
            where: { email },
            select: { id: true, password: true } // Incluimos `id` para el token
        });

        // Si el usuario no existe, retornamos un error
        if (!validUser) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }

        // Verificar que la contraseña sea correcta 
        const validPassword = await bcrypt.compare(password, validUser.password);

        // Retornar un error si la contraseña no es correcta
        if (!validPassword) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        // Generar un token para el usuario
        const token = generarToken(validUser.id);

        // Responder con el token JWT
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso',
            token 
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

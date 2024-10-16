import { type Request, Response } from "express";
import { RegisterRequest } from "../../constants";
import validator from "validator";
import { db } from "../../prisma/index";
import bcrypt from 'bcrypt'

export const RegisterPOST = async (req: Request, res: Response): Promise<void> => {

    const { name, email, password }: RegisterRequest  = req.body

    if(!name || !email || !password){
         res.status(403).json({message: 'Faltan datos por ingresar'})
         return;
    }

    if(!validator.isEmail(email)){
        res.status(403).json({message: 'Formato de email invalido'})
    }
    
    if (!validator.isLength(password, {min: 8, max: 20})) {
        res.status(400).json({message: 'Invalid password'})
        return;
    }
        const emailExiste = await db.user.findUnique({where: {email}})
        if (emailExiste) {
            res.status(400).json({message: 'Email already exists'})
            return;
        }
        //Validamos que la contraseña tenga una longitud de al menos 8 caracteres
        if (!validator.isLength(password, {min: 8})){
            res.status(400).json({message: 'Invalid password'})
            return;
        }
    
        //Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)
        
        //Creamos el usuario
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    
        res.status(201).json({message: 'User created successfully'})
    
    }

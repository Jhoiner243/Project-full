import { Request, Response, NextFunction } from 'express';                                                                                                                                                                                                                                          
import jwt from 'jsonwebtoken';

export const autenticacionJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token de autenticación requerido' });
        return 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        res.locals.userId = decoded.userId // Asigna userId a req para su uso posterior
        next();
    } catch (error) {
       res.status(403).json({ error: 'Token de autenticación inválido' });
       return 
    }
};
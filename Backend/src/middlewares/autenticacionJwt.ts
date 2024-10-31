import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
    userId: number; // o el tipo adecuado, si es diferente
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se encontró el token de autenticación' });
        return
    }

    const token = authHeader.split(' ')[1]; // Obtener el token sin la palabra "Bearer"
    
    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Asigna `userId` a `req`
        req.userId = decoded.userId;
        next(); // Continúa al siguiente middleware o controlador
    } catch (error) {
        console.error('Error en la verificación del token:', error);
         res.status(403).json({ message: 'Token inválido o expirado' });
         return;
    }
};

export default authenticateJWT;

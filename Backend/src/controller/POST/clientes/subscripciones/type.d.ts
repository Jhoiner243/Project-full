import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: number; // O usa el tipo adecuado, como `string` si `userId` es una cadena
    }
}

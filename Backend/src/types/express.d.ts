// src/types/express.d.ts
import express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number; // Agregamos userId como opcional
  }
}

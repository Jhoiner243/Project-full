// src/types.d.ts

import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      userId?: Record<any>;
    }
  }
}

// src/router/productosRouter.ts

import { Router } from "express";
import { db } from "../../prisma";

// Crea una nueva instancia de Router
const productosRouter = Router();

// Define la ruta GET para obtener los productos
productosRouter.get('/productos', async (req, res) => {
  try {
    const productos = await db.producto.findMany();  // Obtiene los productos de la base de datos
    res.status(200).json(productos);  // Responde con los productos en formato JSON
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });  // Muestra un mensaje de error si ocurre un problema
  }
});

// Exporta el router para usarlo en otras partes de la aplicación
export default productosRouter;

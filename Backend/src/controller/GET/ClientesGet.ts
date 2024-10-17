import { Router } from "express";
import { db } from "../../prisma";

// Crea una nueva instancia de Router
const clientesGet= Router();

// Define la ruta GET para obtener los productos
clientesGet.get('/clientes', async (req, res) => {
  try {
    const clientes = await db.cliente.findMany();  // Obtiene los productos de la base de datos
    res.status(200).json(clientes);  // Responde con los productos en formato JSON
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });  // Muestra un mensaje de error si ocurre un problema
  }
});


// Exporta el router para usarlo en otras partes de la aplicación
export default clientesGet;
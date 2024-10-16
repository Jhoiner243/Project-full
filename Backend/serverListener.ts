import { server } from "./src/server"
import { PORT } from "./src/config"

export const serverListener = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    //* Iniciamos el servidor para que escuche en el puerto especificado
    server
      .listen(PORT, (): void => {
        //* Este callback se ejecuta cuando el servidor ha comenzado a escuchar
        console.log(`Server is running on port ${PORT}`)
        console.log(`http://localhost:${PORT}/api`)

        //* Resolvemos la promesa, indicando que el servidor ha comenzado correctamente
        resolve()
      })
      .on("error", (err) => {
        //! Rechazamos la promesa con un nuevo error que describe el problema
        reject(new Error(`Servidor fallando: ${err.message}`))
      })
  })
}

serverListener()
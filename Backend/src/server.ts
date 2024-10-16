import Express, { type Application, json} from 'express'
import cors from 'cors'
import { router } from './router/router';
import productosRouter from './controller/GET/productosGET';
import clientesGet from './controller/GET/ClientesGet';

const corsOptions = {
  origin: "http://localhost:5173", // Asegúrate de que este sea el origen correcto
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
};

export const server: Application = Express();
server.use(json());
server.use('*',cors(corsOptions))


server.use('/api', router)
server.use('/api', productosRouter)
server.use('/api', clientesGet)

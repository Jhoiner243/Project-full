import { Router } from "express";
import { RegisterPOST } from "../controller/POST/RegisterPOST";
import { LoginPOST } from "../controller/POST/LoginPOST";
import { GetLogin, updateLogin } from "../controller/GET/GetLogin";
import { AñadirProductos } from "../controller/POST/Productos";
import { pedidosCreate } from "../controller/POST/PedidosPOST";
import { clientesPOST } from "../controller/POST/clientes/clientesPOST";
import { clienteEdit } from "../controller/POST/clientes/clienteEdit";
import { clienteDelete } from "../controller/POST/clientes/clientesDelete";
import  suscripcionPushPOST  from "../controller/POST/clientes/subscripciones/tokenPost";


export const router: Router = Router();

router.post('/Register', RegisterPOST)
router.post('/login', LoginPOST)
router.get("/login/:id", GetLogin)
router.put("login/:id", updateLogin)
router.post('/productos', AñadirProductos)
router.post('/pedidos/:cliente_id', pedidosCreate)
router.post('/clientes', clientesPOST)
router.put('/clientes/:id_cliente', clienteEdit)
router.delete('/clientes/.id_cliente', clienteDelete)
router.post('/subscription',  suscripcionPushPOST);
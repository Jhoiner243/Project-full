export interface Pedidos {
    producto: string;
    cantidad: number;
    precio_venta: number;
}

export interface Cliente {
    id: number;
    nombre_tienda: string;
  }

  export interface PedidoGet {
    id: number;
    fecha: Date
    total: number;
    estado: 'pagado' | 'fiado'
    pedido: PedidoGet[]
  }
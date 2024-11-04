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
    fecha: string;
    total: number;
    estado: 'pagado' | 'fiado';
    pedido: DetallesPedidos[];
  }

  export interface DetallesPedidos {
    id: number;
    pedido_id: number;
    cantidad: number;
    precio_compra: number;
    precio_venta: number;

  }
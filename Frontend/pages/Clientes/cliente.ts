export interface ClienteProps {
    id_cliente: number;
    nombre_cliente: string;
    direccion: string;
    nombre_tienda: string;
    telefono: string
}

export interface CLiente {
    clientes: ClienteProps[]
}
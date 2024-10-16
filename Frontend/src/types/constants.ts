export interface Register {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface TipoUsuario {
    name: string;
    email: string;
    password: string;
  }

export interface RegisterComponentProps {
    datos: {
      tiposUsuario: TipoUsuario[];
    };
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    formValues: {
      name: string;
      email: string;
      password: string;
    };
  }

export interface ProductosProps {
  nombre_producto: string;
  precio_compra: number;
  cantidad: number;
}

export interface Productos {
 productos?: ProductosProps[]
}


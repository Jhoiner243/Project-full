-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('pagado', 'fiado');

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre_cliente" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "nombre_tienda" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre_producto" TEXT NOT NULL,
    "precio_compra" DECIMAL(10,2) NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetallePedido" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "producto" TEXT NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,
    "precio_compra" DECIMAL(10,2) NOT NULL,
    "precio_venta" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

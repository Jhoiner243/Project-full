# Usamos la imagen oficial de Node.js para construir el frontend
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY Frontend/package*.json ./Frontend/

# Instalar dependencias del frontend
RUN cd Frontend && npm install

# Copiar todo el código fuente del frontend
COPY Frontend/ ./Frontend/

# Construir la aplicación React
RUN cd Frontend && npm run build

# Usamos la misma imagen base para el servidor de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json del backend
COPY Backend/package*.json ./Backend/

# Instalar dependencias del backend
RUN cd Backend && npm install

# Copiar el código fuente del backend
COPY Backend/ ./Backend/

# Copiar los archivos construidos de React al backend
COPY --from=build /app/Frontend/build /app/Backend/public

# Exponer el puerto para el backend
EXPOSE 3001

# Configurar el servidor Express para servir el frontend estático
WORKDIR /app/Backend

# Comando para ejecutar el servidor
CMD ["node", "server.js"]

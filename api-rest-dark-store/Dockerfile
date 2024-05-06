# Usa la imagen oficial de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en la raíz de la aplicación
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existe) en el directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que funciona tu aplicación Node.js (puerto 443 en este caso)
EXPOSE 443

# Define el comando para ejecutar tu aplicación
CMD ["node", "index.js"]

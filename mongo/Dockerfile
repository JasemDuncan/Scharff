# Usa la imagen oficial de MongoDB como base
FROM mongo:latest

# Copia el script de inicialización a la carpeta de entrada de Docker
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expone el puerto de MongoDB
EXPOSE 27017

# Define el comando para ejecutar el servidor MongoDB
CMD ["mongod", "--bind_ip_all"]

# React + Vite

Este proyecto es una aplicación de ejemplo socket.io + React + Vite.
Currently, two

## Requerimientos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Iniciar el proyecto

Renombrar el archivo `.env.template` a `.env` y modificar las variables de entorno según sea necesario.

**Construir y levantar los contenedores:**

Ejecuta el siguiente comando para construir las imágenes y levantar los contenedores:

```bash
docker-compose up -d --build
```

### Accede a las aplicaciones

- El backend estará disponible en <http://localhost:65000>.
- El frontend estará disponible en <http://localhost:64000>.
- Ambos servicios se comunican entre sí a través de la red interna de Docker, utilizando los nombres de servicio definidos en el archivo docker-compose.yml.

### Conectar a MongoDB

La base de datos MongoDB estará disponible en el contenedor `mongo-db` y se puede acceder en `mongodb://localhost:27017`.

### Comandos Útiles

Detener los contenedores:

```bash
docker-compose down
```

Ver los logs de un contenedor específico:

```bash
docker logs <nombre_del_contenedor>
```

### Acceder a un contenedor en ejecución

```bash
Copiar código
docker exec -it <nombre_del_contenedor> /bin/bash
```

### Notas

El backend de Node.js se conecta a MongoDB usando la URI `mongodb://mongo:27017/mydb`, que hace referencia al contenedor MongoDB.
El frontend React utiliza la variable de entorno `VITE_API_URL` para conectarse al backend.

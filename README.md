# Sistema de Votación

Sistema de votación en tiempo real con Node.js, Express, Mongoose y MongoDB Atlas. Permite a equipos tomar decisiones democráticas sobre actividades como películas o cenas.

## Stack Tecnológico

- **Backend**: Node.js + Express
- **Base de datos**: MongoDB Atlas (Mongoose)
- **Frontend**: EJS (templating)
- **Estilos**: CSS personalizado con diseño moderno
- **Autenticación**: No requerida (sistema abierto)

## Características

- ✅ Interfaz moderna y responsiva
- ✅ Votación en tiempo real con MongoDB Atlas
- ✅ Barras de progreso animadas con porcentajes reales
- ✅ Categorías de votación (película, cena)
- ✅ API REST para gestión de opciones
- ✅ Logs detallados en terminal para debugging
- ✅ Diseño adaptativo para móviles

## Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd SistemaVotacionDB
```

2. Instala dependencias:
```bash
npm install
```

3. Configura variables de entorno en `.env`:
```env
MONGO_URI=mongodb+srv://Augusto:Moon0205@cluster0.5thlfwu.mongodb
PORT=5000
```

## Configuración de MongoDB Atlas

1. Crea un clúster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configura Network Access a `0.0.0.0/0` (acceso global)
3. Crea un usuario de base de datos
4. Copia la cadena de conexión y agréga al `.env`

## Estructura del Proyecto

```
SistemaVotacionDB/
├── app.js                    # Servidor Express y conexión MongoDB
├── models/
│   └── Votacion.js          # Esquema Mongoose de votación
├── controllers/
│   └── opciones.controller.js # Lógica de negocio
├── routes/
│   └── api.js               # Rutas de la aplicación
├── views/
│   ├── index.ejs            # Página principal de votación
│   └── resultados.ejs       # Página de resultados
├── public/
│   ├── style.css            # Estilos CSS
│   └── app.js               # JavaScript frontend
└── .env                     # Variables de entorno
```

## Uso

### Iniciar el servidor

```bash
npm start
# o con nodemon para desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Crear opciones de votación

Usa la API para crear opciones:

```bash
curl -X POST http://localhost:5000/api/votaciones \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Inception", "categoria": "pelicula"}'
```

### API Endpoints

- `GET /` - Página principal de votación
- `POST /votar/:id` - Registrar un voto
- `GET /resultados` - Ver resultados
- `GET /api/votaciones` - Obtener todas las votaciones (JSON)
- `POST /api/votaciones` - Crear nueva opción
- `DELETE /api/votaciones/:id` - Eliminar opción

## Flujo de Votación

1. Usuario accede a `/` y ve las opciones disponibles
2. Selecciona una opción y hace clic para votar
3. El voto se envía a `/votar/:id` (POST)
4. MongoDB Atlas incrementa el contador de forma atómica
5. Usuario es redirigido a `/resultados`
6. Se muestran los resultados actualizados con porcentajes

## Logs del Sistema

El sistema muestra logs detallados en la terminal:

```
🗳️ Intentando incrementar voto para ID: [ID]
✅ Voto guardado exitosamente en MongoDB Atlas
   Título: [nombre]
   Votos totales: [número]
   Categoría: [pelicula/cena]
```

## Tecnologías Clave

- **Mongoose**: ODM para MongoDB con esquemas y métodos estáticos
- **Express**: Framework web para Node.js
- **EJS**: Motor de plantillas para renderizar vistas
- **MongoDB Atlas**: Base de datos en la nube
- **async/await**: Programación asíncrona para operaciones de base de datos

## Contribución

Este es un proyecto colaborativo de 4 personas. Cada persona tiene roles específicos en el desarrollo del sistema.

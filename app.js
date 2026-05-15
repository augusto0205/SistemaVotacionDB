require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/votacion_db';

// Conexión a MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });
    console.log("=> Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error crítico conectando a MongoDB:");
    console.error("Mensaje:", error.message);
    console.error("Tipo:", error.name);
    process.exit(1);
  }
};

// Event listeners para diagnóstico
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado de MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Motor de Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Rutas
//app.get('/', (req, res) => {
   // res.send('Servidor de Votaciones funcionando correctamente');
//});

// API routes
app.use('/', require('./routes/api'));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// Iniciar servidor
const iniciarServidor = async () => {
  await conectarDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT}`);
  });
};

iniciarServidor();

module.exports = app;
const express = require('express');
const router = express.Router();
const opcionesCtrl = require('../controllers/opciones.controller');
const Votacion = require('../models/Votacion');

// ==========================================
// RUTAS PARA LAS VISTAS (Tu tarea principal)
// ==========================================

// Página principal: Obtiene opciones y renderiza index.ejs
router.get('/', opcionesCtrl.mostrarOpciones);

// Procesar voto: Recibe el ID y redirige a resultados
// Se usa :id en la URL para que sea fácil de manejar desde el frontend
router.post('/votar/:id', opcionesCtrl.votar);

// Página de resultados: Obtiene datos actualizados y renderiza resultados.ejs
router.get('/resultados', opcionesCtrl.mostrarResultados);


// ==========================================
// RUTAS DE LA API (Para datos JSON o Postman)
// ==========================================

// Obtener todas las votaciones en formato JSON
router.get('/api/votaciones', async (req, res) => {
    try {
        const { categoria } = req.query;
        let votaciones;
        
        if (categoria) {
            votaciones = await Votacion.obtenerPorCategoria(categoria);
        } else {
            votaciones = await Votacion.find().sort({ votos: -1, titulo: 1 });
        }
        
        res.json({
            message: 'Lista de votaciones',
            data: votaciones,
            count: votaciones.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener votaciones', error: error.message });
    }
});

// Crear una nueva opción (Útil para poblar la base de datos)
router.post('/api/votaciones', async (req, res) => {
    try {
        const { titulo, categoria } = req.body;
        const existente = await Votacion.findOne({ titulo, categoria });
        
        if (existente) {
            return res.status(400).json({ message: 'Ya existe esta opción' });
        }
        
        const nuevaVotacion = new Votacion({ titulo, categoria });
        await nuevaVotacion.save();
        
        res.status(201).json({ message: 'Creada exitosamente', data: nuevaVotacion });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear', error: error.message });
    }
});

// Eliminar una opción
router.delete('/api/votaciones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const votacionEliminada = await Votacion.findByIdAndDelete(id);
        
        if (!votacionEliminada) {
            return res.status(404).json({ message: 'No encontrada' });
        }
        
        res.json({ message: 'Eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error: error.message });
    }
});

module.exports = router;
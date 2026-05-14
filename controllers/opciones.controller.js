const opcionesController = {};

opcionesController.mostrarOpciones = (req, res) => {
    res.send('Página de inicio: Aquí se verán las opciones para votar');
};

opcionesController.votar = (req, res) => {
    res.send('Voto procesado (Simulación)');
};

opcionesController.mostrarResultados = (req, res) => {
    res.send('Página de resultados: Aquí se verán los votos totales');
};
const Votacion = require('../models/Votacion'); // Importas el modelo de image_2d931a.png



// 1. Obtener opciones (mostrarOpciones)
opcionesController.mostrarOpciones = async (req, res) => {
    try {
        // Usamos find() para traer todos los documentos de la colección
        const opciones = await Votacion.find(); 
        res.render('index', { opciones }); 
    } catch (error) {
        console.error("Error al obtener opciones:", error);
        res.status(500).send("Error en el servidor");
    }
};

// 2. Aumentar votos (votar)
opcionesController.votar = async (req, res) => {
    const { id } = req.params;
    try {
        // Aprovechamos el método estático que ya creaste en Votacion.js
        await Votacion.incrementarVotoPorId(id); 
        res.redirect('/resultados'); 
    } catch (error) {
        console.error("Error al votar:", error);
        res.status(404).send("No se pudo registrar el voto");
    }
};

// 3. Mostrar Resultados (mostrarResultados)
opcionesController.mostrarResultados = async (req, res) => {
    try {
        // Traemos las opciones ordenadas por votos de mayor a menor
        const opciones = await Votacion.find().sort({ votos: -1 });
        res.render('resultados', { opciones });
    } catch (error) {
        console.error("Error al mostrar resultados:", error);
        res.status(500).send("Error en el servidor");
    }
};


module.exports = opcionesController;
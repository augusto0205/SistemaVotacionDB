const opcionesController = {};
const Votacion = require('../models/Votacion');



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
        console.log(`🗳️ Intentando incrementar voto para ID: ${id}`);
        // Aprovechamos el método estático que ya creaste en Votacion.js
        const resultado = await Votacion.incrementarVotoPorId(id);
        console.log(`✅ Voto guardado exitosamente en MongoDB Atlas`);
        console.log(`   Título: ${resultado.titulo}`);
        console.log(`   Votos totales: ${resultado.votos}`);
        console.log(`   Categoría: ${resultado.categoria}`);
        res.redirect('/resultados');
    } catch (error) {
        console.error("❌ Error al votar:", error);
        res.status(404).send("No se pudo registrar el voto");
    }
};

// 3. Mostrar Resultados (mostrarResultados)
opcionesController.mostrarResultados = async (req, res) => {
    try {
        console.log(`📊 Obteniendo resultados de MongoDB Atlas...`);
        // Traemos las opciones ordenadas por votos de mayor a menor
        const opciones = await Votacion.find().sort({ votos: -1 });
        console.log(`✅ Resultados recuperados: ${opciones.length} opciones`);
        opciones.forEach(opcion => {
            console.log(`   - ${opcion.titulo}: ${opcion.votos} votos`);
        });
        res.render('resultados', { opciones });
    } catch (error) {
        console.error("❌ Error al mostrar resultados:", error);
        res.status(500).send("Error en el servidor");
    }
};


module.exports = opcionesController;
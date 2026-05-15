// public/app.js

// 1. Obtener las opciones reales desde el servidor (MongoDB Atlas)
const renderOpciones = async () => {
  const contenedor = document.getElementById('opcionesGrid');
  const mensaje = document.getElementById('mensajeForm');

  if (!contenedor) return;
  contenedor.innerHTML = '';

  try {
    // Le pedimos a tu servidor la lista de opciones que leyó de Atlas
    // Nota: Asegúrate de tener una ruta GET '/api/opciones' o pasar los datos directo
    // Si tu app renderiza el EJS desde el backend, este JS no debería pintar el HTML.
    // Pero si usan Fetch, esta ruta debe devolver el JSON de las opciones.
    const response = await fetch('/api/opciones'); 
    const opciones = await response.json();

    if (opciones.length === 0) {
      mensaje.textContent = 'No hay opciones disponibles en este momento.';
      return;
    }

    mensaje.textContent = '';

    opciones.forEach((opcion) => {
      const label = document.createElement('label');
      label.className = 'opcion-item';
      // ¡OJO!: Usamos opcion._id porque así lo identifica MongoDB Atlas
      label.innerHTML = `
        <input type="radio" name="opcionId" value="${opcion._id}" required />
        <div class="opcion-content">
          <span class="opcion-title">${opcion.titulo}</span>
          <span class="opcion-subtitle">Categoría: ${opcion.categoria}</span>
        </div>
      `;
      contenedor.appendChild(label);
    });
  } catch (error) {
    console.error('Error al recuperar opciones de Atlas:', error);
    mensaje.textContent = 'Error al cargar las opciones de votación.';
  }
};

// 2. Enviar el voto real hacia la base de datos en la nube
const manejarVoto = async (event) => {
  event.preventDefault();
  const seleccion = document.querySelector('input[name="opcionId"]:checked');
  const mensaje = document.getElementById('mensajeForm');

  if (!seleccion) {
    mensaje.textContent = 'Debes seleccionar una opción antes de votar.';
    return;
  }

  const idOpcion = seleccion.value; // Este es el _id de Mongo

  try {
    // Enviamos el voto real al servidor
    const respuesta = await fetch(`/votar/${idOpcion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (respuesta.ok) {
      // Si el servidor procesó el voto en Atlas, saltamos a la ruta de resultados
      window.location.href = '/resultados';
    } else {
      mensaje.textContent = 'Hubo un problema al registrar tu voto en el servidor.';
    }
  } catch (error) {
    console.error('Error en la petición de voto:', error);
    mensaje.textContent = 'Error de conexión con el servidor.';
  }
};

// Inicializador del DOM
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('votoForm');

  if (form) {
    renderOpciones();
    form.addEventListener('submit', manejarVoto);
  }
});
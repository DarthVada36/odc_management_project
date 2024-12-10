import axios from 'axios';

// URL base del backend (proxy)
const API_URL = 'http://localhost:3000/api/unlayer'; // Ajusta según tu configuración

/**
 * Obtiene todas las plantillas desde el backend.
 * @returns {Promise} Lista de plantillas
 */
export const getTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/templates`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error al obtener las plantillas:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Guarda una plantilla a través del backend.
 * @param {string} name Nombre de la plantilla
 * @param {Object} design Diseño de la plantilla
 * @returns {Promise} Respuesta del backend
 */
export const saveTemplate = async (name, design) => {
  try {
    const response = await axios.post(`${API_URL}/templates`, { name, design });
    return response.data;
  } catch (error) {
    console.error('Error al guardar la plantilla:', error.response?.data || error.message);
    throw error;
  }
};

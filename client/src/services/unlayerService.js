import axios from 'axios';
import { unlayerConfig } from '../../config';

// Configuración base de Axios
const api = axios.create({
  baseURL: unlayerConfig.apiUrl,
  auth: {
    username: unlayerConfig.apiKey, // La API Key de Unlayer
    password: '', // La API requiere una contraseña vacía
  },
});

/**
 * Obtiene todas las plantillas del proyecto en Unlayer.
 * @returns {Promise} Lista de plantillas
 */
export const getTemplates = async () => {
  try {
    const response = await api.get('/templates');
    return response.data.data || [];
  } catch (error) {
    console.error('Error al obtener las plantillas:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Guarda una plantilla en Unlayer.
 * @param {string} name Nombre de la plantilla
 * @param {Object} design Diseño de la plantilla
 * @returns {Promise} Respuesta de la API
 */
export const saveTemplate = async (name, design) => {
  try {
    const response = await api.post('/templates', { name, design });
    return response.data;
  } catch (error) {
    console.error('Error al guardar la plantilla:', error.response?.data || error.message);
    throw error;
  }
};

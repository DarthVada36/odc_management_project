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
 * Obtiene una plantilla específica por ID desde el backend.
 * @param {string} templateId ID de la plantilla
 * @returns {Promise} Plantilla específica
 */
export const getTemplateById = async (templateId) => {
  try {
    const response = await axios.get(`${API_URL}/templates/${templateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la plantilla con ID ${templateId}:`, error.response?.data || error.message);
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

/**
 * Actualiza una plantilla existente a través del backend.
 * @param {string} templateId ID de la plantilla
 * @param {string} name Nombre actualizado de la plantilla
 * @param {Object} design Diseño actualizado de la plantilla
 * @returns {Promise} Respuesta del backend
 */
export const updateTemplate = async (templateId, name, design) => {
  try {
    const response = await axios.put(`${API_URL}/templates/${templateId}`, { name, design });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la plantilla con ID ${templateId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Elimina una plantilla específica a través del backend.
 * @param {string} templateId ID de la plantilla
 * @returns {Promise} Respuesta del backend
 */
export const deleteTemplate = async (templateId) => {
  try {
    const response = await axios.delete(`${API_URL}/templates/${templateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la plantilla con ID ${templateId}:`, error.response?.data || error.message);
    throw error;
  }
};

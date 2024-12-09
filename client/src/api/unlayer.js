import axios from 'axios';
import { unlayerAPI } from '../config'; // Importa la configuración desde config.js

/**
 * Guarda una plantilla en Unlayer
 * @param {string} name - Nombre de la plantilla
 * @param {string} htmlContent - Contenido HTML de la plantilla
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const saveTemplate = async (name, htmlContent) => {
  try {
    const response = await axios.post(
      `${unlayerAPI.url}/save`, // URL de la API para guardar
      {
        name,
        content: htmlContent,
      },
      {
        headers: {
          Authorization: `Bearer ${unlayerAPI.apiKey}`, // Usa la API key
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al guardar la plantilla:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Carga una plantilla desde Unlayer
 * @param {string} templateId - ID de la plantilla a cargar
 * @returns {Promise<Object>} - Respuesta de la API con la plantilla
 */
export const loadTemplate = async (templateId) => {
  try {
    const response = await axios.get(`${unlayerAPI.url}/${templateId}`, {
      headers: {
        Authorization: `Bearer ${unlayerAPI.apiKey}`, // Usa la API key
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al cargar la plantilla:', error.response?.data || error.message);
    throw error;
  }
};

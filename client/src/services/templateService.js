import axios from 'axios';

const API_URL = 'http://localhost:3000/api/templates'; // Ajusta según tu configuración

// Obtener todas las plantillas
export const getTemplates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las plantillas:', error.message);
    throw error;
  }
};

// Guardar una nueva plantilla
export const saveTemplate = async (name, design) => {
  try {
    const response = await axios.post(API_URL, { name, design });
    return response.data;
  } catch (error) {
    console.error('Error al guardar la plantilla:', error.message);
    throw error;
  }
};

// Eliminar una plantilla
export const deleteTemplate = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar la plantilla:', error.message);
    throw error;
  }
};
// Actualizar una plantilla
export const updateTemplate = async (id, design) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      design,
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la plantilla:', error.message);
    throw error;
  }
};

// Obtener una plantilla por su ID
export const getTemplateById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la plantilla por ID:', error.message);
    throw error;
  }
};
import axios from 'axios';

const UNLAYER_API_URL = 'https://api.unlayer.com/v2';
const UNLAYER_API_KEY = process.env.UNLAYER_API_KEY; // Tu clave de API

// Configuración de Axios para Unlayer
const apiClient = axios.create({
  baseURL: UNLAYER_API_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(`${UNLAYER_API_KEY}:`).toString('base64')}`,
    'Content-Type': 'application/json',
  },
});


//Obtiene todas las plantillas de Unlayer.
 
export const getTemplates = async (req, res) => {
  try {
    const response = await apiClient.get('/templates');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener plantillas:', error.message);
    res.status(error.response?.status || 500).json({
      message: 'Error al obtener plantillas',
      details: error.response?.data || error.message,
    });
  }
};

// Guarda una nueva plantilla en Unlayer.
 
export const saveTemplate = async (req, res) => {
  const { name, design } = req.body;

  if (!name || !design) {
    return res.status(400).json({ message: 'Faltan parámetros requeridos: name y design' });
  }

  try {
    const response = await apiClient.post('/templates', { name, design });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al guardar plantilla:', error.message);
    res.status(error.response?.status || 500).json({
      message: 'Error al guardar la plantilla',
      details: error.response?.data || error.message,
    });
  }
};

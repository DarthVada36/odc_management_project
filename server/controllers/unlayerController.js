import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const UNLAYER_API_URL = 'https://api.unlayer.com/v2';
const UNLAYER_API_KEY = process.env.UNLAYER_API_KEY;
const UNLAYER_PROJECT_SECRET = process.env.UNLAYER_PROJECT_SECRET;

console.log('UNLAYER_API_KEY:', UNLAYER_API_KEY);
console.log('UNLAYER_PROJECT_SECRET:', UNLAYER_PROJECT_SECRET);

// Configuración del cliente Axios
const apiClient = axios.create({
  baseURL: UNLAYER_API_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(`${UNLAYER_API_KEY}:`).toString(
      'base64'
    )}`,
    'Content-Type': 'application/json',
  },
});

//Obtener plantillas de Unlayer.
export const getTemplates = async (req, res) => {
  try {
    const response = await apiClient.get('/templates');
    return res.status(200).json(response.data); // Responde con el JSON completo
  } catch (error) {
    console.error('Error al obtener plantillas:', error.message);
    return res.status(error.response?.status || 500).json({
      message: 'Error al obtener plantillas',
      details: error.response?.data || error.message,
    });
  }
};

//Guardar una plantilla en Unlayer.

export const saveTemplate = async (req, res) => {
  const { name, design } = req.body;

  if (!name || !design) {
    return res.status(400).json({ message: 'Faltan parámetros requeridos' });
  }

  try {
    console.log('Enviando plantilla:', { name, design });
    const response = await apiClient.post('/templates', { name, design });
    console.log('Respuesta de Unlayer:', response.data);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al guardar la plantilla:', error.message);
    res.status(error.response?.status || 500).json({
      message: 'Error al guardar la plantilla',
      details: error.response?.data || error.message,
    });
  }
};

/**
 * Genera una firma HMAC-SHA256 para un usuario.
 * @param {string} userId - ID único del usuario.
 * @returns {string} - Firma en formato hexadecimal.
 */
const generateHmacSignature = (userId) => {
  const hmac = crypto.createHmac('sha256', UNLAYER_PROJECT_SECRET);
  hmac.update(userId); // Agrega el ID del usuario como mensaje
  return hmac.digest('hex'); // Devuelve la firma en hexadecimal
};

/**
 * Endpoint para generar el objeto `user` con firma.
 */
export const getUserWithSignature = (req, res) => {
  const { userId, name, email } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: 'El ID de usuario es obligatorio.' });
  }

  try {
    const signature = generateHmacSignature(userId);

    const user = {
      id: userId,
      signature,
      name, // Opcional
      email, // Opcional
    };

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error al generar la firma:', error.message);
    res.status(500).json({ message: 'Error al generar la firma.' });
  }
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/mailer/send';

/**
 * Servicio para enviar correos.
 * @param {Array<string>} recipients - Lista de destinatarios.
 * @param {string} subject - Asunto del correo.
 * @param {string} htmlContent - Contenido HTML del correo.
 * @param {boolean} useBcc - Indica si se debe usar copia oculta.
 */
export const sendEmail = async (recipients, subject, htmlContent, useBcc = false) => {
  // Validar que recipients sea un array
  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new Error('La lista de destinatarios debe ser un array con al menos un correo.');
  }

  try {
    const payload = {
      subject,
      htmlContent,
      recipients,
      useBcc,
    };

    console.log('Payload enviado al backend:', payload);

    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo:', error.response?.data || error.message);
    throw error;
  }
};

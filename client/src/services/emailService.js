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
    // Retornar siempre un objeto con { success, message }
    return {
      success: true,
      message: response.data.message || 'Correo enviado con éxito.',
    };
  } catch (error) {
    console.error('Error al enviar el correo:', error.response?.data || error.message);

    // Capturar el mensaje del backend en caso de error
    return {
      success: false,
      message:
        error.response?.data?.message || 'Hubo un error al enviar el correo. Inténtalo de nuevo.',
    };
  }
};

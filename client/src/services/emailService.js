import axios from 'axios';

const API_URL = 'http://localhost:3000/api/mailer/send';

export const sendEmail = async (recipients, subject, htmlContent) => {
  try {
    const response = await axios.post(API_URL, {
      recipients,
      subject,
      htmlContent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo:', error.response?.data || error.message);
    throw error;
  }
};

import nodemailer from 'nodemailer';

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto si usas otro proveedor (como Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Correo remitente
    pass: process.env.EMAIL_PASS, // Contraseña o token
  },
});

/**
 * Servicio para enviar correos.
 * @param {string[]} recipients - Lista de destinatarios.
 * @param {string} subject - Asunto del correo.
 * @param {string} htmlContent - Contenido HTML del correo.
 * @returns {Promise<void>}
 */
export const sendEmail = async (recipients, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Remitente
      to: recipients.join(', '), // Destinatarios (separados por comas)
      subject, // Asunto
      html: htmlContent, // Contenido en formato HTML
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    throw new Error('No se pudo enviar el correo');
  }
};

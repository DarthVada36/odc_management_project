import nodemailer from 'nodemailer';

/**
 * Servicio para enviar correos.
 * @param {Object} options - Opciones de configuración del correo.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} options.htmlContent - Contenido HTML del correo.
 * @param {Array<string>} [options.to] - Lista de destinatarios normales.
 * @param {Array<string>} [options.bcc] - Lista de destinatarios en copia oculta.
 */
export const sendEmail = async ({ subject, htmlContent, to, bcc }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject,
    html: htmlContent,
    ...(to && { to }),
    ...(bcc && { bcc }),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo');
  }
};

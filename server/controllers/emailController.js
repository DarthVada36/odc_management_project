import { sendEmail } from '../mailer/emailService.js';

/**
 * Controlador para enviar un correo.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
export const sendEmailController = async (req, res) => {
  const { recipients, subject, htmlContent, useBcc } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!recipients || !subject || !htmlContent) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  // Validar que recipients sea un array
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ message: 'La lista de destinatarios es inválida.' });
  }

  try {
    const emailOptions = {
      subject,
      htmlContent,
      ...(useBcc ? { bcc: recipients } : { to: recipients }),
    };

    await sendEmail(emailOptions);
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
  }
};

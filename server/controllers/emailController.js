import { sendEmail } from '../mailer/emailService.js';

/**
 * Controlador para enviar un correo.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
export const sendEmailController = async (req, res) => {
  const { recipients, subject, htmlContent } = req.body;

  // Validar que se envíen todos los campos necesarios
  if (!recipients || !subject || !htmlContent) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Llamar al servicio de correo
    await sendEmail(recipients, subject, htmlContent);
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al enviar el correo', error: error.message });
  }
};

import { sendEmail } from '../services/emailService.js';

export const sendBulkEmails = async (req, res) => {
  const { recipients, subject, html } = req.body;

  if (!recipients || recipients.length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron destinatarios.' });
  }

  if (!html) {
    return res.status(400).json({ message: 'No se proporcionó contenido HTML.' });
  }

  try {
    const info = await sendEmail({ recipients, subject, html });
    res.status(200).json({ message: 'Correos enviados 📨', info });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar correos', error });
  }
};

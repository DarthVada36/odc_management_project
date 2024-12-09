import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Cambiar a true si se usa SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función para enviar correos
export const sendEmail = async ({ recipients, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Gestión de Cursos" <${process.env.SMTP_USER}>`,
      to: recipients.join(','), // Destinatarios separados por coma
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

import express from 'express';
import { sendBulkEmails } from '../controllers/emailController.js';

const emailRoutes = express.Router();

// Ruta para enviar correos masivos
emailRoutes.post('/send', sendBulkEmails);

export default emailRoutes;

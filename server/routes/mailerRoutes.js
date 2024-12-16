import express from 'express';
import { sendEmailController } from '../controllers/emailController.js';

const mailerRoutes = express.Router();

// Ruta para enviar correos masivos
mailerRoutes.post('/send', sendEmailController);

export default mailerRoutes;

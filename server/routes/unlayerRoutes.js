import express from 'express';
import { getTemplates, saveTemplate } from '../controllers/unlayerController.js';

const unlayerRoutes = express.Router();

unlayerRoutes.get('/templates', getTemplates);
unlayerRoutes.post('/templates', saveTemplate);

export default unlayerRoutes;

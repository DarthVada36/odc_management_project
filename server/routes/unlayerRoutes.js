import express from 'express';
import { getTemplates, saveTemplate, getUserWithSignature } from '../controllers/unlayerController.js';

const unlayerRoutes = express.Router();

unlayerRoutes.get('/templates', getTemplates);
unlayerRoutes.post('/templates', saveTemplate);
unlayerRoutes.post('/user', getUserWithSignature);

export default unlayerRoutes;

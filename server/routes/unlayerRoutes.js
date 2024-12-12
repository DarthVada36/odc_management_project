import express from 'express';
import { getTemplates, saveTemplate, getUserWithSignature, getTemplateById, deleteTemplate,updateTemplate } from '../controllers/unlayerController.js';

const unlayerRoutes = express.Router();

unlayerRoutes.get('/templates', getTemplates);
unlayerRoutes.post('/templates', saveTemplate);
unlayerRoutes.post('/user', getUserWithSignature);
unlayerRoutes.get('/templates/:id', getTemplateById);
unlayerRoutes.delete('/templates/:id', deleteTemplate);
unlayerRoutes.put('/templates/:id', updateTemplate);

export default unlayerRoutes;

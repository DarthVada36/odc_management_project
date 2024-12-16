import express from 'express';
import { getTemplates, saveTemplate, deleteTemplate, updateTemplate, getTemplateById } from '../controllers/templateController.js';

const templateRoutes = express.Router();

// Rutas para plantillas
templateRoutes.get('/', getTemplates); 
templateRoutes.post('/', saveTemplate); 
templateRoutes.delete('/:id', deleteTemplate);
templateRoutes.put('/:id', updateTemplate);
templateRoutes.get('/:id', getTemplateById);

export default templateRoutes;

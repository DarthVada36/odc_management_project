import express from 'express';
import { getTemplates, saveTemplate, deleteTemplate } from '../controllers/templateController.js';

const templateRoutes = express.Router();

// Rutas para plantillas
templateRoutes.get('/', getTemplates); 
templateRoutes.post('/', saveTemplate); 
templateRoutes.delete('/:id', deleteTemplate);

export default templateRoutes;

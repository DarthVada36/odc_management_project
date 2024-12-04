import express from 'express';
import { getMinorByCourseId } from '../controllers/minorsController.js';

const minorRoutes = express.Router();

// Obtener menores por curso
minorRoutes.get('/course/:course_id', getMinorByCourseId);

export default minorRoutes;

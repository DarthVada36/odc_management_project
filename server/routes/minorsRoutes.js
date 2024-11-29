import express from 'express';
import { getMinorsByCourseId } from '../controllers/minorsController.js';

const router = express.Router();

// Obtener menores por curso
router.get('/course/:course_id', getMinorsByCourseId);

export default router;

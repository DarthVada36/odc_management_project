import express from 'express';
import {
    getMinorByCourseId,
    createMinorByEnrollmentId,
    getMinorsByEnrollmentId,
    // getMinorById,
    updateMinorById,
    deleteMinorById,
} from '../controllers/minorsController.js';

const minorRoutes = express.Router();

// Obtener menores por curso
minorRoutes.get('/course/:course_id', getMinorByCourseId);

// Obtener menores por inscripción
minorRoutes.get('/enrollment/:enrollment_id', getMinorsByEnrollmentId);

// Crear un menor asociado a una inscripción
minorRoutes.post('/enrollment/:enrollment_id', createMinorByEnrollmentId);

// // Obtener un menor por ID
// minorRoutes.get('/:id', getMinorById);

// Actualizar un menor por ID
minorRoutes.put('/:id', updateMinorById);

// Eliminar un menor por ID
minorRoutes.delete('/:id', deleteMinorById);

export default minorRoutes;

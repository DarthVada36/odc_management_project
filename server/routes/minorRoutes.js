import express from 'express';
import {
    getMinorByCourseId,
    
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



// // Obtener un menor por ID
// minorRoutes.get('/:id', getMinorById);

// Actualizar un menor por ID
minorRoutes.put('/:id', updateMinorById);

// Eliminar un menor por ID
minorRoutes.delete('/:id', deleteMinorById);

export default minorRoutes;

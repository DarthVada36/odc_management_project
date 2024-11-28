import express from 'express';
import {
    createMinor,
    getAllMinors,
    getMinorsByEnrollmentId,
    updateMinor,
    deleteMinor,
} from '../controllers/minorsController.js';

const router = express.Router();

// Crear un menor asociado a una inscripción
router.post('/', createMinor);

// Obtener todos los menores
router.get('/', getAllMinors);

// Obtener menores asociados a una inscripción específica
router.get('/enrollment/:enrollment_id', getMinorsByEnrollmentId);

// Actualizar un menor
router.put('/:id', updateMinor);

// Eliminar un menor
router.delete('/:id', deleteMinor);

export default router;

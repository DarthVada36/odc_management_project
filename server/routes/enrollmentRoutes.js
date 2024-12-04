import express from 'express';
import { getAllEnrollments, getEnrollmentById, getEnrollmentByIdWithMinors, createEnrollment, updateEnrollmentById, deleteEnrollmentById } from '../controllers/enrollmentsController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
// import { validateCreateEnrollment } from '../utils/validations/enrollmentValidation.js';


const enrollmentRoutes = express.Router();

enrollmentRoutes.get('/', authMiddleware, checkRol(['superadmin']), getAllEnrollments);
enrollmentRoutes.get('/:id', getEnrollmentById);
enrollmentRoutes.get('/:id/with-minors', getEnrollmentByIdWithMinors);
enrollmentRoutes.post('/',
    // validateCreateEnrollment,
    createEnrollment);
enrollmentRoutes.put('/:id', updateEnrollmentById);
enrollmentRoutes.delete('/:id', deleteEnrollmentById);

export default enrollmentRoutes;
import express from 'express';
import { getAllEnrollments, getEnrollmentById, getEnrollmentByIdWithMinors, createEnrollment, updateEnrollmentById, deleteEnrollmentById, getAllEnrollmentsByCourseId } from '../controllers/enrollmentsController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateCreateEnrollment, validateUpdateEnrollment } from '../utils/validations/enrollmentValidation.js';
import validationHandler from '../utils/handle/handleValidator.js';


const enrollmentRoutes = express.Router();

enrollmentRoutes.get('/',  getAllEnrollments);
enrollmentRoutes.get('/by-course/:id',  getAllEnrollmentsByCourseId);
enrollmentRoutes.get('/:id',  getEnrollmentById);
enrollmentRoutes.get('/:id/with-minors', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getEnrollmentByIdWithMinors);
enrollmentRoutes.post('/', validateCreateEnrollment, validationHandler, createEnrollment);
enrollmentRoutes.put('/:id', validateUpdateEnrollment, validationHandler, authMiddleware, checkRol(['superadmin', 'admin']), updateEnrollmentById);
enrollmentRoutes.delete('/:id',  deleteEnrollmentById);

export default enrollmentRoutes;
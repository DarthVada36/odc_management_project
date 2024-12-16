import express from 'express';
import { getAllEnrollments, getEnrollmentById, getEnrollmentByIdWithMinors, createEnrollment, updateEnrollmentById, deleteEnrollmentById, getAllEnrollmentsByCourseId } from '../controllers/enrollmentsController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
// import { validateCreateEnrollment } from '../utils/validations/enrollmentValidation.js';


const enrollmentRoutes = express.Router();

enrollmentRoutes.get('/',  getAllEnrollments);
enrollmentRoutes.get('/by-course/:id',  getAllEnrollmentsByCourseId);
enrollmentRoutes.get('/:id',  getEnrollmentById);
enrollmentRoutes.get('/:id/with-minors', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getEnrollmentByIdWithMinors);
enrollmentRoutes.post('/'/* , validateCreateEnrollment  */,createEnrollment);
enrollmentRoutes.put('/:id', authMiddleware, checkRol(['superadmin', 'admin']),/* , validateCreateEnrollment,  */ updateEnrollmentById);
enrollmentRoutes.delete('/:id', authMiddleware, checkRol(['superadmin', 'admin']), deleteEnrollmentById);

export default enrollmentRoutes;
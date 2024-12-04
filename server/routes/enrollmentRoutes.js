import express from 'express';
import { getAllEnrollments, getEnrollmentById, getEnrollmentByIdWithMinors, createEnrollment, updateEnrollmentById, deleteEnrollmentById } from '../controllers/enrollmentsController.js';
// import { validateCreateEnrollment } from '../utils/validations/enrollmentValidation.js';


const enrollmentRoutes = express.Router();

enrollmentRoutes.get('/', getAllEnrollments);
enrollmentRoutes.get('/:id', getEnrollmentById);
enrollmentRoutes.get('/:id/with-minors', getEnrollmentByIdWithMinors);
enrollmentRoutes.post('/',
    // validateCreateEnrollment,
    createEnrollment);
enrollmentRoutes.put('/:id', updateEnrollmentById);
enrollmentRoutes.delete('/:id', deleteEnrollmentById);

export default enrollmentRoutes;
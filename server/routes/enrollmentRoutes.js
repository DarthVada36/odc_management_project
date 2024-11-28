import express from 'express';
import { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollmentById, deleteEnrollmentById } from '../controllers/enrollmentsController.js';


const enrollmentRoutes = express.Router();

enrollmentRoutes.get('/', getAllEnrollments);
enrollmentRoutes.get('/:id', getEnrollmentById);
enrollmentRoutes.post('/', createEnrollment);
enrollmentRoutes.put('/:id', updateEnrollmentById);
enrollmentRoutes.delete('/:id', deleteEnrollmentById);

export default enrollmentRoutes;
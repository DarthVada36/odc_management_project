import express from 'express';
import { getAllCourses, getCourseById, createCourse } from '../controllers/coursesController.js';

const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses);
courseRoutes.get('/:id', getCourseById);
courseRoutes.post('/', createCourse);

export default courseRoutes;
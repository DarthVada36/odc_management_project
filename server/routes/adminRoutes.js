import express from 'express';
import { getAllAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/adminsController.js';

const adminRoutes = express.Router(); 

// RUTAS CRUD
adminRoutes.get('/', getAllAdmins);
adminRoutes.get('/:id', getAdminById);
adminRoutes.put('/:id', updateAdmin);
adminRoutes.delete('/:id', deleteAdmin);

export default adminRoutes;
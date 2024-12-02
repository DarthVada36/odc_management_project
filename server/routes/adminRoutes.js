import express from 'express';
// import { getAdminById, getAllAdmins, createAdmin, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/adminsController.js';
import { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin } from '../controllers/adminsController.js';

const adminRoutes = express.Router(); 

// RUTAS CRUD
adminRoutes.get('/', getAllAdmins);
adminRoutes.get('/:id', getAdminById);
adminRoutes.post('/', createAdmin);
adminRoutes.put('/:id', updateAdmin);
adminRoutes.delete('/:id', deleteAdmin);
// adminRoutes.post('/access-admin', loginAdmin);

export default adminRoutes;
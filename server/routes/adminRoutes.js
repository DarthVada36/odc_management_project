import { Router } from 'express';
import { getAdminById, getAllAdmins, createAdmin, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/adminsController.js';

export const adminRouter = Router(); 

// RUTAS CRUD
adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/new-admin', createAdmin);
adminRouter.put('/:id', updateAdmin);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.post('/login', loginAdmin);
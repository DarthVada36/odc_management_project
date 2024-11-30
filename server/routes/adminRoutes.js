import { Router } from 'express';
import { getAdminById, getAllAdmins, createAdmin, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/adminsController.js';

export const adminRouter = Router(); 

// RUTAS CRUD
adminRouter.get('/admin', getAllAdmins);  
adminRouter.get('/admin/:id', getAdminById);
adminRouter.post('/admins', createAdmin);  
adminRouter.put('/admin/:id', updateAdmin);  
adminRouter.delete('/admin/:id', deleteAdmin);  
adminRouter.post('/login', loginAdmin);  

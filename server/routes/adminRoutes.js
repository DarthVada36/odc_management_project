import { Router } from 'express';
import { getAllAdmins } from '../controllers/adminsController.js';

export const adminRouter = Router();

//RUTAS CRUD
adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/', createAdmin);
adminRouter.put('/:id', updateAdmin);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.post('/login', loginAdmin);





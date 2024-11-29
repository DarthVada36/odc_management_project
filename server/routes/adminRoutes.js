import { Router } from 'express';
import { getAllAdmins } from '../controllers/adminsController.js';

export const adminRouter = Router();

//RUTAS CRUD
adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', getAdminById);

// router.get('/admins', adminsController.getAllAdmins);
// router.post('/admins', adminsController.createAdmin);
// router.put('/admins/:id', adminsController.updateAdmin);
// router.delete('/admins/:id', adminsController.deleteAdmin);
// router.post('/login', adminsController.login);



import { Router } from 'express';
import { 
    loginAdmin,
    createAdmin, 
    getAllAdmins, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin 
} from '../controllers/adminsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const adminRouter = Router();

// Rutas públicas
adminRouter.post('/access-admin', loginAdmin);
adminRouter.post('/new-admin', createAdmin);

// Rutas protegidas
adminRouter.get('/admins', authMiddleware, getAllAdmins);
adminRouter.get('/admins/:id', authMiddleware, getAdminById);
adminRouter.put('/admins/:id', authMiddleware, updateAdmin);
adminRouter.delete('/admins/:id', authMiddleware, deleteAdmin);
<<<<<<< HEAD
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
=======
import express from 'express'
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} from '../controllers/adminController.js'

const router = express.Router()

router.post('/', createAdmin)
router.get('/', getAdmins)
router.get('/:id', getAdminById)
router.put('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)

export default router
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

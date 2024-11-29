import { Router } from 'express';
import adminsController from '../controllers/adminsController.js'; 

const router = Router();

router.get('/admins', adminsController.getAllAdmins);
router.post('/admins', adminsController.createAdmin);
router.put('/admins/:id', adminsController.updateAdmin);
router.delete('/admins/:id', adminsController.deleteAdmin);
router.post('/login', adminsController.login);

export default router;


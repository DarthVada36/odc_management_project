import { Router } from 'express';
import Admin from '../models/adminModel.js';

//GET ALL ADMINS
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los administradores' });
  }
};

//GET ADMIN BY ID


//CREATE ADMIN (POST)


//UPDATE ADMIN BY ID (PUT)


//DELETE ADMIN BY ID (DELETE)




// const adminsController = {
//   login: (req, res) => {
//     const { email, password } = req.body;
//     // Simple placeholder login logic
//     if (email === 'admin@example.com' && password === 'password') {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   },
//   getAllAdmins: (req, res) => {
//     res.json({ message: 'Obteniendo todos los administradores' });
//   },
//   createAdmin: (req, res) => {
//     res.json({ message: 'Administrador creado' });
//   },
//   updateAdmin: (req, res) => {
//     res.json({ message: `Administrador actualizado con ID ${req.params.id}` });
//   },
//   deleteAdmin: (req, res) => {
//     res.json({ message: `Administrador eliminado con ID ${req.params.id}` });
//   },
// };

// export default adminsController;
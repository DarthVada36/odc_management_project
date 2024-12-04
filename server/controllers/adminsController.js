<<<<<<< HEAD
import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password', 'roleId']
    });

    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, roleId: admin.roleId },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        roleId: admin.roleId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};
// GET ALL ADMINS
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ['id', 'email', 'roleId', 'createdAt', 'updatedAt']
    });
    res.json(admins);
  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({ error: 'Error al obtener los administradores' });
  }
};

// GET ADMIN BY ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const admin = await Admin.findOne({
      where: { id },
      attributes: ['id', 'email', 'roleId', 'createdAt', 'updatedAt']
    });

    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Get admin by id error:', error);
    res.status(500).json({ error: 'Error al obtener el administrador' });
  }
};

// CREATE ADMIN
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Ya existe un administrador con este email' });
    }

    const newAdmin = await Admin.create({
      email,
      password,
      roleId: 2 // ADMIN normal
    });

    res.status(201).json({
      message: 'Administrador creado exitosamente',
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        roleId: newAdmin.roleId
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
};

// UPDATE ADMIN
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, role_id } = req.body;

    // Verificar si el admin existe
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    // Preparar datos a actualizar
    const updateData = {};
    if (email) updateData.email = email;
    if (role_id) updateData.roleId = role_id;
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Actualizar admin
    await admin.update(updateData);

    res.json({ 
      message: 'Administrador actualizado exitosamente',
      admin: {
        id: admin.id,
        email: admin.email,
        roleId: admin.roleId
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
};

// DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    await admin.destroy();
    res.json({ 
      message: 'Administrador eliminado exitosamente',
      deletedId: id
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
};
=======
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

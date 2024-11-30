import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Inicio de sesión exitoso',
      adminId: admin.id
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

// GET ALL ADMINS
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los administradores' });
  }
};

// GET ADMIN BY ID
export const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findByPk(adminId);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el administrador' });
  }
};

// CREATE ADMIN (POST)
export const createAdmin = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({ email, password: hashedPassword });


    res.status(201).json({
      id: newAdmin.id,
      email: newAdmin.email,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt
    });
  } catch (error) {
    console.error('Error al crear administrador:', error);
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
};

// UPDATE ADMIN BY ID (PUT)
export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password } = req.body;
    const updatedAdmin = await Admin.update(
      { name, email, password },
      { where: { id: adminId } }
    );
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
};

// DELETE ADMIN BY ID (DELETE)
export const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    await Admin.destroy({ where: { id: adminId } });

    res.json({ message: 'Administrador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
};
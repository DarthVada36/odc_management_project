import { encrypt, compare } from '../utils/handlePassword.js';
import { tokenSign } from '../utils/handleJwt.js';
import Admin from '../models/adminModel.js';

// Controlador para registrar un administrador
export const registerAdmin = async (req, res) => {
  const { username, password, role_id } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const hashedPassword = await encrypt(password);
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      role_id,
    });

    const token = await tokenSign({
       id: newAdmin.id,
       username: newAdmin.username, 
       role_id: newAdmin.role_id });

    res.status(201).json({
      message: 'Administrador registrado con éxito',
      token,
      adminId: newAdmin.id,
      username: newAdmin.username,
      role_id: newAdmin.role_id,
    });
  } catch (error) {
    console.error('Error al registrar administrador:', error);
    res.status(500).json({ message: 'Error al registrar administrador', error: error.message });
  }
};

// Controlador para iniciar sesión
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = await tokenSign({
      id: admin.id,
      username:admin.username,
      role_id: admin.role_id,
    });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      adminId: admin.id,
      username: admin.username,
      role_id: admin.role_id,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Controlador para actualizar datos del administrador
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, role_id } = req.body;
  const { role_id: userRole } = req.user; // Role del usuario autenticado

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    if (role_id && userRole !== 1) { // Solo rol_id 1 puede cambiar roles
      return res.status(403).json({ message: 'No autorizado para cambiar roles' });
    }

    const updatedFields = { username };
    if (password) updatedFields.password = await encrypt(password);
    if (role_id && userRole === 1) updatedFields.role_id = role_id;

    await admin.update(updatedFields);

    res.json({ message: 'Administrador actualizado con éxito', admin });
  } catch (error) {
    console.error('Error al actualizar administrador:', error);
    res.status(500).json({ message: 'Error al actualizar administrador', error: error.message });
  }
};

// Controlador para eliminar un administrador
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    await admin.destroy();
    res.json({ message: 'Administrador eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar administrador:', error);
    res.status(500).json({ message: 'Error al eliminar administrador', error: error.message });
  }
};

// Controlador para obtener todos los administradores
export const getAllAdmins = async (req, res) => {
  const { role_id: userRole } = req.user; // Role del usuario autenticado

  if (userRole !== 1) { // Solo rol_id 1 puede ver todos los administradores
    return res.status(403).json({ message: 'No autorizado para ver administradores' });
  }

  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ['password'] }, // Excluye el password
    });

    res.json(admins);
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
  }
};

// Controlador para obtener un administrador por ID
export const getAdminById = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role_id: userRole } = req.user;

  // Solo rol 1 o el propio administrador pueden ver los datos
  if (userRole !== 1 && userId !== parseInt(id)) {
    return res.status(403).json({ message: 'No autorizado para ver este administrador' });
  }

  try {
    const admin = await Admin.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Error al obtener administrador:', error);
    res.status(500).json({ message: 'Error al obtener administrador', error: error.message });
  }
};
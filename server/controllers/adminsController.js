import Admin from '../models/adminModel.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // LOGIN ADMIN
// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Buscar el administrador por su email
//     const admin = await Admin.findOne({ where: { email } });

//     if (!admin) {
//       return res.status(401).json({ error: 'Credenciales inválidas' });
//     }

//     // Comparar la contraseña ingresada con la almacenada encriptada
//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Credenciales inválidas' });
//     }

//     // Crear un token JWT para el administrador
//     const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//       message: 'Inicio de sesión exitoso',
//       token: token,
//       adminId: admin.id,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error en el inicio de sesión' });
//   }
// };

// GET ALL ADMINS
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los administradores' });
  }
};

// GET ADMIN BY ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE ADMIN (POST)
export const createAdmin = async (req, res) => {
  try {
    const { username, password, role_id } = req.body;

    // Encriptar la contraseña antes de guardarla
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo administrador con la contraseña encriptada
    // const newAdmin = await Admin.create({ name, password: hashedPassword });
    const newAdmin = await Admin.create({ username, password, role_id });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
};

// // UPDATE ADMIN BY ID (PUT)
// export const updateAdmin = async (req, res) => {
//   try {
//     const adminId = req.params.id;
//     const { name, email, password } = req.body;

//     // Si se proporciona una nueva contraseña, encriptarla
//     let hashedPassword;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     // Actualizar los datos del administrador, incluyendo la contraseña si se proporcionó
//     const updatedAdmin = await Admin.update(
//       { name, email, password: hashedPassword || password },
//       { where: { id: adminId } }
//     );
//     res.json(updatedAdmin);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el administrador' });
//   }
// };

// UPDATE ADMIN BY ID (PUT)
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    const admin = await Admin.update({ username, password, role_id }, { where: { id } });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // DELETE ADMIN BY ID (DELETE)
// export const deleteAdmin = async (req, res) => {
//   try {
//     const adminId = req.params.id;
//     await Admin.destroy({ where: { id: adminId } });
//     res.json({ message: 'Administrador eliminado' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el administrador' });
//   }
// };

// DELETE ADMIN BY ID (DELETE)
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.destroy({ where: { id } });
    res.status(200).json({ message: 'Administrador eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Admin from '../models/adminModel.js';

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
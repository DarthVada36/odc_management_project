// adminController.js
import Admin from '../models/adminModel.js'
import Role from '../models/roleModel.js'
import bcrypt from 'bcryptjs'

// Crear un admin
const createAdmin = async (req, res) => {
    try {
        const { username, password, role_id } = req.body

        // Verificar que el rol existe
        const role = await Role.findByPk(role_id)
        if (!role) {
            return res.status(400).json({ message: 'Invalid role_id' })
        }

        // Hash del password
        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            username,
            password: hashedPassword,
            role_id,
        })

        // Excluir el password del response
        const adminResponse = admin.toJSON()
        delete adminResponse.password

        res.status(201).json(adminResponse)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Username already exists' })
        }
        res.status(500).json({ message: error.message })
    }
}

// Obtener todos los admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
            attributes: { exclude: ['password'] },
        })
        res.json(admins)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener un admin por ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id, {
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
            attributes: { exclude: ['password'] },
        })
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }
        res.json(admin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Actualizar un admin
const updateAdmin = async (req, res) => {
    try {
        const { username, role_id } = req.body
        const admin = await Admin.findByPk(req.params.id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        if (role_id) {
            const role = await Role.findByPk(role_id)
            if (!role) {
                return res.status(400).json({ message: 'Invalid role_id' })
            }
        }

        await admin.update({ username, role_id })

        const updatedAdmin = await Admin.findByPk(req.params.id, {
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
            attributes: { exclude: ['password'] },
        })

        res.json(updatedAdmin)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Username already exists' })
        }
        res.status(500).json({ message: error.message })
    }
}

// Eliminar un admin
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id)
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }
        await admin.destroy()
        res.json({ message: 'Admin deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin }

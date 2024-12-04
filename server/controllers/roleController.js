import Role from '../models/roleModel.js'

// Create a new role
const createRole = async (req, res) => {
    try {
        const { name } = req.body
        const allowedRoles = ['superadmin', 'admin', 'facilitator']
        if (!allowedRoles.includes(name)) {
            return res.status(400).json({ message: 'Invalid role name' })
        }
        const role = await Role.create({ name })
        res.status(201).json(role)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Role already exists' })
        }
        res.status(500).json({ message: error.message })
    }
}

// Get all roles
const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll()
        res.json(roles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get a single role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id)
        if (!role) {
            return res.status(404).json({ message: 'Role not found' })
        }
        res.json(role)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update a role by ID
const updateRole = async (req, res) => {
    try {
        const { name } = req.body
        const allowedRoles = ['superadmin', 'admin', 'facilitator']
        if (!allowedRoles.includes(name)) {
            return res.status(400).json({ message: 'Invalid role name' })
        }

        const role = await Role.findByPk(req.params.id)
        if (!role) {
            return res.status(404).json({ message: 'Role not found' })
        }

        await role.update({ name })
        res.json(role)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Role name already exists' })
        }
        res.status(500).json({ message: error.message })
    }
}

// Delete a role by ID
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id)
        if (!role) {
            return res.status(404).json({ message: 'Role not found' })
        }
        await role.destroy()
        res.json({ message: 'Role deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createRole, getRoles, getRoleById, updateRole, deleteRole }

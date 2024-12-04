<<<<<<< HEAD
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import connectionDb from '../database/connectionDb.js';

const Admin = connectionDb.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100]
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2, // Cambiado a 2 para que por defecto sea ADMIN normal
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    }
  }
});

export default Admin;
=======
import { DataTypes } from 'sequelize'
import connectionDb from '../database/connectionDb.js'

const Admin = connectionDb.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id',
        },
        allowNull: false,
    },
})

export default Admin
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

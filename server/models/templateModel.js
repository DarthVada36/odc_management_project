import { DataTypes } from 'sequelize';
import sequelize from '../config/connection_db.js'; // Tu conexión a la base de datos

const Template = sequelize.define('Template', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  design: {
    type: DataTypes.JSONB, // Formato JSON para almacenar el diseño
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'templates',
  timestamps: false, // Si no estás usando createdAt y updatedAt automáticos
});

export default Template;

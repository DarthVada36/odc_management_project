import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js'; // Tu conexión a la base de datos

const Template = connectionDb.define(
  'Template',
  {
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
      type: DataTypes.JSON, // Cambiado a JSON, compatible con MySQL
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'templates',
    timestamps: false, // Si no estás usando createdAt y updatedAt automáticos
  }
);

export default Template;

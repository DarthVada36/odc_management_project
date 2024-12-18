import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Course = connectionDb.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  external_id: {
    type: DataTypes.STRING, // Para sincronización futura con el CMS
    allowNull: true,
    unique: true, // Evita duplicados
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 255], // Longitud mínima y máxima
    },
  },
  description: {
    type: DataTypes.TEXT, // Para descripciones más largas
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('date'); // Obtén la fecha en crudo
      if (!rawValue) return null;

      // Formatear a "dd/mm/yyyy"
      const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(rawValue));

      return formattedDate; // Devuelve la fecha formateada
    },
  },
  schedule: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  tickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // No puede ser negativo
    },
  },
});

export default Course;

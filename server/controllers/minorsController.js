import Minor from '../models/minorModel.js';
import Enrollment from '../models/enrollmentModel.js';
import { response } from 'express';

export const createMinor = async (req, res) => {
  try {
    const { name, age, enrollment_id } = req.body;

    // Validar que la inscripción exista
    const enrollment = await Enrollment.findByPk(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    // Controlador para crear el menor asociado

    const newMinor = await Minor.create({ name, age, enrollment_id });
    res.status(201).json(newMinor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Controlador para obtener una relación todos los menores
export const getAllMinors = async (req, res) => {
  try {
    const minors = await Minor.findAll();
    res.status(200).json(minors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener menores asociados a una inscripción específica

export const getMinorsByEnrollmentId = async (req, res) => {
  try {
    const { enrollment_id } = req.params;

    // Verificar que la inscripción exista
    const enrollment = await Enrollment.findByPk(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    // Controlador para obtener menores asociados a una inscripción específica
    const minors = await Minor.findAll({
      where: { enrollment_id },
    });

    res.status(200).json(minors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

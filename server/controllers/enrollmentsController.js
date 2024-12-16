import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';
import Minor from '../models/minorModel.js';
import sequelize from '../database/connectionDb.js';

// Función auxiliar para obtener inscripción con menores
const getEnrollmentWithMinors = async (id) => {
  return Enrollment.findByPk(id, {
    include: [
      {
        model: Minor,
        as: 'minors',
        attributes: ['id', 'name', 'age'],
      },
    ],
  });
};

// GET ALL ENROLLMENTS
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['title'], // Solo incluye el título del curso
        },
        {
          model: Minor,
          as: 'minors',
          attributes: ['id', 'name', 'age'],
        },
      ],
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ENROLLMENT BY ID
export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Minor,
          as: "minors",
          attributes: ["id", "name", "age"], // Campos específicos de los menores
        },
        {
          model: Enrollment, // Relación con otros adultos del mismo grupo
          as: "adults",
          attributes: ["id", "fullname", "email", "age", "gender", "is_first_activity"],
          where: { group_id: Sequelize.col("Enrollment.group_id") },
          required: false, // No es obligatorio que existan adultos adicionales
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ENROLLMENT BY ID INCLUDING MINORS
export const getEnrollmentByIdWithMinors = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await getEnrollmentWithMinors(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE ENROLLMENT
export const createEnrollment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      fullname,
      email,
      gender = "NS/NC",
      age = 0,
      is_first_activity = false,
      id_admin = null,
      id_course,
      group_id = null, // Cambiamos la lógica para generar un entero si es necesario
      accepts_newsletter = false,
      minors = [],
      adults = [], // Segundo adulto
    } = req.body;

    // Validación de campos obligatorios
    if (!fullname || !email || !id_course) {
      return res.status(400).json({
        message: "Faltan datos obligatorios: fullname, email, o id_course.",
      });
    }

    // Validación de edad del titular
    if (age < 14) {
      return res.status(400).json({
        message: "El titular debe ser mayor de 14 años.",
      });
    }

    // Generar un nuevo group_id si no se proporciona
    const lastGroupId = group_id || (await Enrollment.max("group_id")) || 0;
    const newGroupId = group_id || lastGroupId + 1;

    // Crear la inscripción principal
    const enrollment = await Enrollment.create(
      {
        fullname,
        email,
        gender,
        age,
        is_first_activity,
        id_admin,
        id_course,
        group_id: newGroupId, // Asignar el nuevo group_id
        accepts_newsletter,
      },
      { transaction }
    );

    // Crear los menores asociados (si los hay)
    if (Array.isArray(minors) && minors.length > 0) {
      const minorData = minors.map((minor) => ({
        ...minor,
        enrollment_id: enrollment.id,
      }));
      await Minor.bulkCreate(minorData, { transaction });
    }

    // Crear el segundo adulto (si se proporciona)
    if (Array.isArray(adults) && adults.length > 0) {
      const adultData = adults.map((adult) => ({
        fullname: adult.fullname,
        email: adult.email,
        gender: adult.gender,
        age: adult.age,
        is_first_activity: adult.is_first_activity || false,
        id_admin: adult.id_admin || id_admin,
        id_course,
        group_id: newGroupId, // Mismo group_id del titular
        accepts_newsletter: adult.accepts_newsletter || false,
      }));
      await Enrollment.bulkCreate(adultData, { transaction });
    }

    // Confirmar transacción
    await transaction.commit();

    // Respuesta exitosa
    res.status(201).json({
      message: "Inscripción creada con éxito.",
      enrollment,
    });
  } catch (error) {
    // Rollback de la transacción en caso de error
    await transaction.rollback();
    console.error("Error al crear la inscripción:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ENROLLMENT BY ID
export const updateEnrollmentById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      fullname,
      email,
      gender,
      age,
      is_first_activity,
      id_admin,
      id_course,
      group_id,
      accepts_newsletter,
      minors,
      adults,
    } = req.body;

    const enrollment = await Enrollment.findByPk(id, { transaction });
    if (!enrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    // Actualizar titular
    await enrollment.update(
      {
        fullname,
        email,
        gender,
        age,
        is_first_activity,
        id_admin,
        id_course,
        group_id, // Usar el mismo group_id existente
        accepts_newsletter,
      },
      { transaction }
    );

    // Actualizar menores asociados
    if (minors && minors.length > 0) {
      for (const minor of minors) {
        if (minor.id) {
          await Minor.update(
            { name: minor.name, age: minor.age },
            { where: { id: minor.id, enrollment_id: id }, transaction }
          );
        } else {
          await Minor.create({ ...minor, enrollment_id: id }, { transaction });
        }
      }
    }

    // Actualizar o agregar segundo adulto
    if (adults && adults.length > 0) {
      for (const adult of adults) {
        if (adult.id) {
          await Enrollment.update(
            {
              fullname: adult.fullname,
              email: adult.email,
              gender: adult.gender,
              age: adult.age,
            },
            { where: { id: adult.id, group_id }, transaction }
          );
        } else {
          await Enrollment.create(
            {
              fullname: adult.fullname,
              email: adult.email,
              gender: adult.gender,
              age: adult.age,
              is_first_activity: adult.is_first_activity || false,
              id_admin: adult.id_admin || id_admin,
              id_course,
              group_id,
            },
            { transaction }
          );
        }
      }
    }

    // Confirmar transacción
    await transaction.commit();

    // Respuesta exitosa
    res.status(200).json({ message: "Inscripción actualizada con éxito." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar la inscripción:", error);
    res.status(500).json({ message: error.message });
  }
};


// DELETE ENROLLMENT BY ID
export const deleteEnrollmentById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, { transaction });
    if (!enrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    await Minor.destroy({ where: { enrollment_id: id }, transaction });
    await enrollment.destroy({ transaction });

    await transaction.commit();
    res.status(200).json({ message: 'Inscripción eliminada correctamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ENROLLMENTS BY COURSE ID
export const getAllEnrollmentsByCourseId = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['title'], // Solo incluye el título del curso
        },
        {
          model: Minor,
          as: 'minors',
          attributes: ['id', 'name', 'age'],
        },
      ],
      where: {
        id_course: req.params.id,
      },
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

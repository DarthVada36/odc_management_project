import Enrollment from "../models/enrollmentModel.js";
import Course from "../models/courseModel.js";
import Minor from "../models/minorModel.js";
import sequelize from "../database/connectionDb.js";

// Función auxiliar para obtener inscripción con menores
const getEnrollmentWithMinors = async (id) => {
  return Enrollment.findByPk(id, {
    include: [
      {
        model: Minor,
        as: "minors",
        attributes: ["id", "name", "age"],
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
          as: "course",
          attributes: ["title"], // Solo incluye el título del curso
        },
        {
          model: Minor,
          as: "minors",
          attributes: ["id", "name", "age"],
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
    const enrollment = await Enrollment.findByPk(id);
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
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
      group_id,
      accepts_newsletter = false,
      minors = [],
    } = req.body;

    // Validación de campos obligatorios
    if (!fullname || !email || !id_course) {
      return res.status(400).json({
        message: "Faltan datos obligatorios: fullname, email, o id_course.",
      });
    }

    // Validación del límite de menores
    if (Array.isArray(minors) && minors.length > 3) {
      return res.status(400).json({
        message: "No se pueden inscribir más de 3 menores.",
      });
    }

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
        group_id,
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

    // Confirmar transacción
    await transaction.commit();

    // Obtener inscripción con los menores
    const createdEnrollment = await Enrollment.findOne({
      where: { id: enrollment.id },
      attributes: 
      [
        "id",
        "fullname",
        "email",
        "gender",
        "age",
        "id_course",
        "group_id",
        "accepts_newsletter",
      ], 
      include: [
        {
          model: Minor,
          as: "minors",
          attributes: ["id", "name", "age"],
        },
      ],
    });

    // Respuesta exitosa
    res.status(201).json({
      message: "Inscripción creada con éxito.",
      enrollment: createdEnrollment,
    });
  } catch (error) {
    // Rollback de la transacción en caso de error
    await transaction.rollback();
    console.error("Error al crear la inscripción:", {
      error: error.message,
      stack: error.stack,
      input: req.body,
    });
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ENROLLMENT BY ID INCLUDING MINORS
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
    } = req.body;

    const enrollment = await Enrollment.findByPk(id, { transaction });
    if (!enrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    await enrollment.update(
      {
        fullname,
        email,
        gender,
        age,
        is_first_activity,
        id_admin,
        id_course,
        group_id,
        accepts_newsletter,
      },
      { transaction }
    );

    if (minors && minors.length > 0) {
      for (const minor of minors) {
        if (minor.id) {
          const [updatedRows] = await Minor.update(
            { name: minor.name, age: minor.age },
            {
              where: { id: minor.id, enrollment_id: id },
              transaction,
            }
          );

          if (updatedRows === 0) {
            throw new Error(
              `Minor with id ${minor.id} not found for this enrollment`
            );
          }
        }
      }
    }

    await transaction.commit();

    const updatedEnrollment = await getEnrollmentWithMinors(id);
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    await transaction.rollback();
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
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    await Minor.destroy({ where: { enrollment_id: id }, transaction });
    await enrollment.destroy({ transaction });

    await transaction.commit();
    res.status(200).json({ message: "Inscripción eliminada correctamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

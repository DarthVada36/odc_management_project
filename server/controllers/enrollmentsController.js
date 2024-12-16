import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';
import Minor from '../models/minorModel.js';
import sequelize from '../database/connectionDb.js';
import { Op } from 'sequelize';


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
      group_id = null,
      accepts_newsletter = false,
      minors = [],
      adults = [],
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

    // Verificar la disponibilidad de tickets del curso
    const course = await Course.findByPk(id_course, { transaction });
    if (!course) {
      return res.status(404).json({
        message: "Curso no encontrado.",
      });
    }

    // Calcular el total de tickets requeridos
    const totalTicketsRequired = 1 + adults.length + minors.length; // 1 titular + adultos + menores

    if (course.tickets < totalTicketsRequired) {
      return res.status(400).json({
        message: "No hay suficientes tickets disponibles para esta inscripción.",
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
        group_id: newGroupId,
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
        group_id: newGroupId,
        accepts_newsletter: adult.accepts_newsletter || false,
      }));
      await Enrollment.bulkCreate(adultData, { transaction });
    }

    // Descontar tickets del curso
    await Course.update(
      {
        tickets: course.tickets - totalTicketsRequired,
      },
      { where: { id: id_course }, transaction }
    );

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
      accepts_newsletter,
      minors = [],
      adults = [],
    } = req.body;

    const enrollment = await Enrollment.findByPk(id, { transaction });
    if (!enrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    // Verificar si el curso ha cambiado
    const previousCourseId = enrollment.id_course;
    if (id_course && id_course !== previousCourseId) {
      // Liberar un ticket en el curso anterior
      const previousCourse = await Course.findByPk(previousCourseId, { transaction });
      if (previousCourse) {
        await previousCourse.increment("tickets", { by: 1, transaction });
      }

      // Verificar y descontar ticket en el nuevo curso
      const newCourse = await Course.findByPk(id_course, { transaction });
      if (!newCourse || newCourse.tickets <= 0) {
        await transaction.rollback();
        return res.status(400).json({
          message: "No hay tickets disponibles para el nuevo curso.",
        });
      }
      await newCourse.decrement("tickets", { by: 1, transaction });
    }

    // Actualizar la inscripción principal
    await enrollment.update(
      {
        fullname,
        email,
        gender,
        age,
        is_first_activity,
        id_admin,
        id_course,
        accepts_newsletter,
      },
      { transaction }
    );

    // Actualizar menores asociados
    if (minors && minors.length > 0) {
      for (const minor of minors) {
        if (minor.id) {
          // Actualizar menor existente
          await Minor.update(
            { name: minor.name, age: minor.age },
            { where: { id: minor.id, enrollment_id: id }, transaction }
          );
        } else {
          // Agregar nuevo menor
          await Minor.create({ ...minor, enrollment_id: id }, { transaction });
        }
      }
    }

    // Eliminar menores que ya no estén en la lista
    const existingMinors = await Minor.findAll({ where: { enrollment_id: id }, transaction });
    const minorIdsToKeep = minors.map((minor) => minor.id);
    for (const existingMinor of existingMinors) {
      if (!minorIdsToKeep.includes(existingMinor.id)) {
        await existingMinor.destroy({ transaction });
      }
    }

    // Actualizar adultos asociados
    if (adults && adults.length > 0) {
      for (const adult of adults) {
        if (adult.id) {
          // Actualizar adulto existente
          await Enrollment.update(
            {
              fullname: adult.fullname,
              email: adult.email,
              gender: adult.gender,
              age: adult.age,
            },
            { where: { id: adult.id, group_id: enrollment.group_id }, transaction }
          );
        } else {
          // Agregar nuevo adulto
          await Enrollment.create(
            {
              fullname: adult.fullname,
              email: adult.email,
              gender: adult.gender,
              age: adult.age,
              is_first_activity: adult.is_first_activity || false,
              id_admin: adult.id_admin || id_admin,
              id_course,
              group_id: enrollment.group_id, // Mantener el mismo group_id
            },
            { transaction }
          );
        }
      }
    }

    // Eliminar adultos que ya no estén en la lista
    const existingAdults = await Enrollment.findAll({
      where: { group_id: enrollment.group_id, id: { [sequelize.Op.ne]: enrollment.id } },
      transaction,
    });
    const adultIdsToKeep = adults.map((adult) => adult.id);
    for (const existingAdult of existingAdults) {
      if (!adultIdsToKeep.includes(existingAdult.id)) {
        await existingAdult.destroy({ transaction });
      }
    }

    // Confirmar transacción
    await transaction.commit();

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

    // Buscar la inscripción principal
    const enrollment = await Enrollment.findByPk(id, { transaction });
    if (!enrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    // Buscar el curso asociado
    const course = await Course.findByPk(enrollment.id_course, { transaction });
    if (!course) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Contar menores asociados a la inscripción principal
    const minorsCount = await Minor.count({
      where: { enrollment_id: id },
      transaction,
    });

    // Buscar adultos asociados al mismo group_id (excluyendo la inscripción principal)
    const adultsCount = await Enrollment.count({
      where: {
        group_id: enrollment.group_id,
        id: { [Op.ne]: id }, // Excluir la inscripción principal
      },
      transaction,
    });

    // Calcular el total de tickets a devolver
    const totalTicketsToRefund = 1 + minorsCount + adultsCount; // +1 por el adulto principal

    // Actualizar los tickets del curso
    course.tickets += totalTicketsToRefund;
    await course.save({ transaction });

    // Eliminar menores asociados
    await Minor.destroy({ where: { enrollment_id: id }, transaction });

    // Eliminar adultos asociados al mismo group_id
    await Enrollment.destroy({
      where: {
        group_id: enrollment.group_id,
        id: { [Op.ne]: id }, // Excluir la inscripción principal
      },
      transaction,
    });

    // Eliminar la inscripción principal
    await enrollment.destroy({ transaction });

    // Confirmar la transacción
    await transaction.commit();
    res.status(200).json({ message: 'Inscripción eliminada correctamente' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al eliminar la inscripción:', error);
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



//UPDATE ENROLLMENT BY ID (modificado)
/* export const updateEnrollmentById = async (req, res) => {
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
      minors = [],
      adults = [],
    } = req.body;

    // Obtener la inscripción actual con menores y adultos
    const existingEnrollment = await Enrollment.findByPk(id, {
      include: [
        { model: Minor, as: 'minors' },
        { model: Enrollment, as: 'adults', where: { group_id }, required: false },
      ],
      transaction,
    });

    if (!existingEnrollment) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    // Obtener el curso para verificar los tickets disponibles
    const course = await Course.findByPk(id_course, { transaction });
    if (!course) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Calcular diferencias en menores
    const currentMinors = existingEnrollment.minors.length;
    const newMinors = minors.length;
    const minorsDifference = newMinors - currentMinors;

    // Calcular diferencias en adultos (incluye el titular y otros adultos del grupo)
    const currentAdults = existingEnrollment.adults.length + 1; // +1 por el titular actual
    const newAdults = adults.length + 1; // +1 por el titular actualizado
    const adultsDifference = newAdults - currentAdults;

    // Calcular tickets totales necesarios
    const totalDifference = minorsDifference + adultsDifference;

    if (totalDifference > 0 && course.tickets < totalDifference) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'No hay suficientes tickets disponibles para completar la inscripción.',
      });
    }

    // Actualizar la inscripción principal
    await existingEnrollment.update(
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

    // Actualizar menores asociados
    const existingMinorIds = existingEnrollment.minors.map((minor) => minor.id);
    const updatedMinorIds = minors.map((minor) => minor.id).filter(Boolean);

    // Eliminar menores que ya no están
    const minorsToDelete = existingMinorIds.filter(
      (id) => !updatedMinorIds.includes(id)
    );
    if (minorsToDelete.length > 0) {
      await Minor.destroy({
        where: { id: minorsToDelete },
        transaction,
      });
    }

    // Crear o actualizar menores
    for (const minor of minors) {
      if (minor.id) {
        // Actualizar menor existente
        await Minor.update(
          { name: minor.name, age: minor.age },
          { where: { id: minor.id, enrollment_id: id }, transaction }
        );
      } else {
        // Crear nuevo menor
        await Minor.create({ ...minor, enrollment_id: id }, { transaction });
      }
    }

    // Actualizar o agregar adultos adicionales
    for (const adult of adults) {
      if (adult.id) {
        // Actualizar adulto existente
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
        // Crear nuevo adulto
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

    // Actualizar tickets del curso
    if (totalDifference !== 0) {
      course.tickets -= totalDifference;
      await course.save({ transaction });
    }

    // Confirmar transacción
    await transaction.commit();
    res.status(200).json({ message: 'Inscripción actualizada con éxito.' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar la inscripción:', error);
    res.status(500).json({ message: error.message });
  }
};
 */
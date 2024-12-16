import axios from "axios";

const API_URL = "http://localhost:3000/api/enrollments";

// Obtener todas las inscripciones -- GET
export const getAllEnrollments = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("No se han podido cargar las inscripciones", error.message);
    throw error;
  }
};

// Obtener una inscripción por ID incluyendo menores y adultos -- GET
export const getEnrollmentById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data; // Incluirá toda la información asociada (menores, adultos)
  } catch (error) {
    console.error("No se pudo obtener la inscripción indicada", error.message);
    throw error;
  }
};

// Obtener inscripciones de un curso específico -- GET
export const getAllEnrollmentsByCourseId = async (courseId) => {
  try {
    const res = await axios.get(`${API_URL}/by-course/${courseId}`);
    return res.data;
  } catch (error) {
    console.error("No se pudieron obtener las inscripciones del curso", error.message);
    throw error;
  }
};

// Eliminar una inscripción por ID -- DELETE
export const deleteEnrollmentById = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("No se pudo eliminar la inscripción indicada", error.message);
    throw error;
  }
};

// Crear una nueva inscripción -- POST
export const createEnrollment = async (data) => {
  try {
    const enrollmentPayload = {
      fullname: data.fullname,
      email: data.email,
      gender: data.gender || "NS/NC",
      age: data.age || 0,
      is_first_activity: data.is_first_activity || false,
      id_admin: data.id_admin || null,
      id_course: data.id_course,
      accepts_newsletter: data.accepts_newsletter || false,
      minors: data.minors || [], // Menores asociados
      adults: data.adults || [], // Adultos adicionales
    };

    const response = await axios.post(API_URL, enrollmentPayload);
    return response.data;
  } catch (error) {
    console.error("Error al crear la inscripción:", error.message);
    throw error;
  }
};

// Actualizar una inscripción existente por ID -- PUT
export const updateEnrollmentById = async (id, enrollmentData) => {
  try {
    const updatedPayload = {
      fullname: enrollmentData.fullname,
      email: enrollmentData.email,
      gender: enrollmentData.gender,
      age: enrollmentData.age,
      is_first_activity: enrollmentData.is_first_activity,
      id_admin: enrollmentData.id_admin,
      id_course: enrollmentData.id_course,
      accepts_newsletter: enrollmentData.accepts_newsletter,
      minors: enrollmentData.minors || [], // Menores asociados
      adults: enrollmentData.adults || [], // Adultos adicionales
    };

    const res = await axios.put(`${API_URL}/${id}`, updatedPayload);
    return res.data;
  } catch (error) {
    console.error("No se pudo actualizar la inscripción", error.message);
    throw error;
  }
};

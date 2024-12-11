import axios from "axios";

const API_URL = "http://localhost:3000/api/enrollments";

//Get all enrollments -- GET
export const getAllEnrollments = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("No se han podido cargar las inscripciones", error.message);
        throw error;
    }
};

//Get enrollment by ID -- GET
export const getEnrollmentById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo obtener la inscripción indicada", error.message);
        throw error;
    }
};


export const getAllEnrollmentsByCourseId = async (courseId) => {
    try {
        const res = await axios.get(`${API_URL}/by-course/${courseId}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo obtener la inscripción indicada", error.message);
        throw error;
    }
};

//Delete enrollment by ID -- DELETE
export const deleteEnrollmentById = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo eliminar la inscripción indicada", error.message);
        throw error;
    }
};

//Create enrollment -- POST
export const createEnrollment = async (data) => {
    try {
        const response = await axios.post(API_URL, {
            fullname: data.fullname,                  // Nombre completo
            email: data.email,                        // Correo electrónico
            gender: data.gender || 'NS/NC',            // Género, por defecto 'NS/NC'
            age: data.age || 0,                       // Edad, por defecto 0
            is_first_activity: data.is_first_activity || false,  // ¿Es la primera actividad?
            id_admin: data.id_admin || null,           // ID del administrador (opcional)
            id_course: data.id_course || 101,          // ID del curso (por defecto 101)
            group_id: data.group_id || null,           // ID del grupo (opcional)
            accepts_newsletter: data.accepts_newsletter || false, // ¿Acepta el boletín?
            // No es necesario enviar createdAt y updatedAt si estás usando Sequelize, 
            // ya que estos se manejan automáticamente
        });

        return response.data;
    } catch (error) {
        console.error("Error al crear la inscripción:", error);
        throw error;
        
    }
    
    
};

//Update enrollment by ID -- PUT
export const updateEnrollmentById = async (id, enrollmentData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, enrollmentData);
        return res.data;
    } catch (error) {
        console.error("No se pudo actualizar la inscripción", error.message);
        throw error;
    }
};
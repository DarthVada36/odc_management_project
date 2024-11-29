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
export const createEnrollment = async (enrollmentData) => {
    try {
        const res = await axios.post(API_URL, enrollmentData);
        return res.data;
    } catch (error) {
        console.error("No se pudo crear la inscripción", error.message);
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


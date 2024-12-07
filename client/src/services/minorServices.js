import axios from "axios";

const  API_URL  = 'http://localhost:3000/api/minors';

//Get all news -- GET
export const getAllMinors = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error('Error al obtener a todos los menores', error.message);
        throw error;
    }
};

//Get minor by ID -- GET
export const getMinorById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener el menor por ID', error.message);
        throw error;
    }
};

// Get minors by Course ID -- GET
export const getMinorsByCourseId = async (courseId) => {
    try {
        const res = await axios.get(`${API_URL}/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener los menores por Course ID', error.message);
        throw error;
    }
};

//Delete minor by ID -- DELETE
export const deleteMinorById = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error al eliminar el menor por ID', error.message);
        throw error;
    }
};

export const createMinor = async (data) => {
    try {
        const response = await axios.post(`/api/minors/enrollment/${data.enrollment_id}`, {
            name: data.name || null,
            age: data.age || null,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear el menor");
    }
};


//Update minor by ID -- PUT
export const updateMinorById = async (id, minorData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, minorData);
        return res.data;
    } catch (error) {
        console.error('Error al actualizar el menor por ID', error.message);
        throw error;
    }
};


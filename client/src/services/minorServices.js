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

//Create minor -- POST
export const createMinor = async (minorData) => {
    try {
        const res = await axios.post(API_URL, minorData);
        return res.data;
    } catch (error) {
        console.error('Error al crear el menor', error.message);
        throw error;
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


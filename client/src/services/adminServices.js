import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admins';

//Get all admins -- GET
export const getAllAdmins = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("No se han podido cargar los administradores", error.message);
        throw error;
    }
};

//Get admin by ID
export const getAdminById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo obtener el administrador indicado", error.message);
        throw error;
    }
};

//Delete admin by ID -- DELETE
export const deleteAdminById = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo eliminar el administrador indicado", error.message);
        throw error;
    }
};

//Create admin -- POST
export const createAdmin = async (adminData) => {
    try {
        const res = await axios.post(API_URL, adminData);
        return res.data;
    } catch (error) {
        console.error("No se pudo crear el administrador", error.message);
        throw error;
    }
};

//Update admin by ID -- PUT
export const updateAdminById = async (id, adminData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, adminData);
        return res.data;
    } catch (error) {
        console.error("No se pudo actualizar el administrador indicado", error.message);
        throw error;
    }
};



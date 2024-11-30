import axios from "axios";

const API_URL = 'http://localhost:3000/api/roles';

//Get all roles -- GET
export const getAllRoles = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("No se han podido cargar los roles", error.message);
        throw error;
    }
};

//Get role by ID -- GET
export const getRoleById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo obtener el rol indicado", error.message);
        throw error;
    }
};

//Delete role by ID -- DELETE
export const deleteRoleById = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo eliminar el rol indicado", error.message);
        throw error;
    }
};

//Create role -- POST
export const createRole = async (roleData) => {
    try {
        const res = await axios.post(API_URL, roleData);
        return res.data;
    } catch (error) {
        console.error("No se pudo crear el rol", error.message);
        throw error;
    }
};

//Update role by ID -- PUT
export const updateRoleById = async (id, roleData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, roleData);
        return res.data;
    } catch (error) {
        console.error("No se pudo actualizar el rol", error.message);
        throw error;
    }
};


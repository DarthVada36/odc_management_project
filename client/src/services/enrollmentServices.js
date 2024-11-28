import axios from 'axios';
const URL_API = "http://localhost:5173";

//GET ALL ENROLLMENTS
export const getAllEnrollments = async () => {          
    try {
        const response = await axios.get(URL_API);
        return response;
    } catch (error) {
        console.error('getAllEnrollments error ', error.message);
        throw error;
    }
};

//GET ENROLLMENT BY ID
export const getEnrollmentById = async (id) => {
    try {
        const response = await axios.get(`${URL_API}/${id}`);
        return response;
    } catch (error) {
        console.error('getEnrollmentById error ', error.message);
        throw error;
    }
};

//CREATE ENROLLMENT
export const createEnrollment = async (data) => {
    try {
        const response = await axios.post(URL_API, data);
        return response;
    } catch (error) {
        console.error('createEnrollment error ', error.message);
        throw error;
    }
};

//UPDATE ENROLLMENT
export const updateEnrollment = async (id, data) => {
    try {
        const response = await axios.put(`${URL_API}/${id}`, data);
        return response;
    } catch (error) {
        console.error('updateEnrollment error ', error.message);
        throw error;
    }
};

//DELETE ENROLLMENT
export const deleteEnrollment = async (id) => {
    try {
        const response = await axios.delete(`${URL_API}/${id}`);
        return response;
    } catch (error) {
        console.error('deleteEnrollment error ', error.message);
        throw error;
    }
};
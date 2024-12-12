import axios from "axios";

const  API_URL  = 'http://localhost:3000/api/minors';





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






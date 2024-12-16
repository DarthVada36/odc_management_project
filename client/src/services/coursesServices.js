import axios from 'axios'

const API_URL = 'http://localhost:3000/api/courses'

// Función auxiliar para obtener el token y las cabeceras
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
        throw new Error('Token no encontrado. Por favor, inicia sesión.')
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

// Obtener todos los cursos -- GET
export const getAllCourses = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('No se han podido cargar los cursos:', error.message)
        throw error
    }
}


// Obtener un curso por ID -- GET
export const getCourseById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("No se pudo obtener el curso indicado:", error.message);
      throw error;
    }
  };

// Eliminar un curso por ID -- DELETE
export const removeCourseById = async (id) => {
    try {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await axios.delete(`${API_URL}/${id}`, config)
        return response.data
    } catch (error) {
        console.error('No se pudo eliminar el curso indicado:', error)
        throw error
    }
}

// Crear un curso -- POST
export const createCourse = async (courseData) => {
    try {
        const response = await axios.post(API_URL, courseData, getAuthHeaders())
        return response.data
    } catch (error) {
        console.error('No se pudo crear el curso:', error.message)
        throw error
    }
}

// Actualizar un curso por ID -- PUT
export const updateCourseById = async (courseId, courseData) => {
    try {
        const response = await axios.put(
            `${API_URL}/${courseId}`,
            courseData,
            getAuthHeaders()
        )
        return response.data
    } catch (error) {
        console.error('Error al actualizar el curso:', error.message)
        throw error
    }
}

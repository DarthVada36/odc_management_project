import axios from "axios";

const API_URL = 'http://localhost:3000/api/courses'

//Get all courses -- GET
export const getAllCourses = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("No se han podido cargar los cursos", error.message);
        throw error;
    }
};

//Get course by ID -- GET


// Función mock para obtener cursos
export const getCourseById = async (id) => {
    const mockCourses = [
      {
        id: 101,
        external_id: "EXT-001",
        title: "Curso de React",
        description: "Aprende los fundamentos de React.",
        date: "2024-01-15",
        schedule: "10:00 - 14:00",
        link: "https://example.com/course/101",
        tickets: 20,
        created_at: "2023-12-01",
        updated_at: "2023-12-05",
      },
      // Agrega más cursos según sea necesario
    ];
  
    const course = mockCourses.find((course) => course.id === id);
    if (!course) {
      throw new Error("Curso no encontrado.");
    }
    return course;
  };

// export const getCourseById = async (id) => {
//     try {
//         const res = await axios.get(`${API_URL}/${id}`);
//         return res.data;
//     } catch (error) {
//         console.error("No se pudo obtener el curso indicado", error.message);
//         throw error;
//     }
// };

//Delete course by ID -- DELETE

export const deleteCourseById = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("No se pudo eliminar el curso indicado", error.message);
        throw error;
    }
};

//Create course -- POST

export const createCourse = async (courseData) => {
    try {
        const res = await axios.post(API_URL, courseData);
        return res.data;
    } catch (error) {
        console.error("No se pudo crear el curso", error.message);
        throw error;
    }
};

//Update course by ID -- PUT

export const updateCourseById = async (id, courseData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, courseData);
        return res.data;
    } catch (error) {
        console.error("No se pudo actualizar el curso", error.message);
        throw error;
    }
};
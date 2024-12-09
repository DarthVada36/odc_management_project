import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCourseById } from "../services/coursesServices"; // Servicio para obtener curso

const MainForm = ({
  setIncludeMinor,
  setIncludeAdult,
  includeMinor,
  includeAdult,
  formData,
  setFormData,
  courseId, // El ID del curso seleccionado se pasa como prop
}) => {
  const { register, formState: { errors } } = useForm({ defaultValues: formData });
  const [courseData, setCourseData] = useState(null); // Estado para datos del curso
  const [courseError, setCourseError] = useState(""); // Estado para errores de curso

  useEffect(() => {
    // Al cargar el componente, obtenemos los datos del curso por el ID
    const fetchCourse = async () => {
      try {
        const course = await getCourseById(courseId); // Buscar datos del curso
        setCourseData(course); // Guardar datos en el estado
        setFormData((prevData) => ({
          ...prevData,
          courseId: course.id, // Asociar el ID del curso al formulario
        }));
        setCourseError("");
      } catch (error) {
        setCourseError(error.message); // Manejar error si el curso no se encuentra
      }
    };
    fetchCourse();
  }, [courseId, setFormData]); // Se ejecuta cada vez que el ID del curso cambie

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 border border-orange bg-light shadow-md w-full max-w-screen">
      <h2 className="font-semibold text-lg mb-4 text-orange">Datos Personales</h2>
      {courseError && <p className="text-red-500">{courseError}</p>}
      {courseData && (
        <div className="mb-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold text-lg">{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p><strong>Fecha:</strong> {courseData.date}</p>
          <p><strong>Horario:</strong> {courseData.schedule}</p>
        </div>
      )}
      <form className="flex flex-col gap-4">
        {/* Nombre Completo */}
        <div>
          <label className="block font-medium mb-1">Nombre Completo:</label>
          <input
            className="w-full border border-dark px-3 py-2"
            {...register("fullname", { required: "Este campo es obligatorio" })}
            onChange={handleChange}
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email:</label>
          <input
            className="w-full border border-dark px-3 py-2"
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Por favor, ingresa un email válido",
              },
            })}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Género y edad */}
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            className="flex-1 border border-dark"
            {...register("gender")}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="otros generos">Otro</option>
          </select>
          <label htmlFor="age">Edad:</label>
          <input
            id="age"
            name="age"
            type="number"
            className="flex-1 border border-dark px-3 py-2"
            {...register("age")}
            onChange={handleChange}
          />
        </div>

        {/* Checkboxes */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeMinor}
              onChange={() => setIncludeMinor(!includeMinor)}
            />
            Con uno o más menores de 14 años
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={() => setIncludeAdult(!includeAdult)}
            />
            Con un mayor de 14 años
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MainForm;

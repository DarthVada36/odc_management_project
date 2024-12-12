import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCourseById } from "../services/coursesServices"; // Servicio para obtener curso

const MainForm = ({
  setIncludeMinor,
  includeMinor,
  formData,
  setFormData,
  onAddMinor, // Nueva prop para manejar menores
  minors = [],
  courseId, 
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: formData });
  const [courseData, setCourseData] = useState(null); // Estado para datos del curso
  const [courseError, setCourseError] = useState(""); // Estado para errores de curso
  const [minor, setMinor] = useState({ name: "", age: "" }); // Estado del menor actual
  const [minorError, setMinorError] = useState("");

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
  }, [courseId, setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMinorChange = (e) => {
    const { name, value } = e.target;
    setMinor((prev) => ({ ...prev, [name]: value }));
  };

  const validateMinor = () => {
    if (!minor.name || !minor.age) {
      setMinorError("Todos los campos de menores son obligatorios.");
      return false;
    }
    setMinorError("");
    return true;
  };

  const addMinor = () => {
  if (validateMinor()) {
    const updatedMinors = [...(formData.minors || []), minor];
    setFormData({ ...formData, minors: updatedMinors });
    onAddMinor(minor);
    setMinor({ name: "", age: "" });
  }
};

  return (
    <div className="p-6 border border-orange bg-light shadow-md w-full max-w-screen">
      <h2 className="font-semibold text-lg mb-4 text-orange">
        Datos Personales
      </h2>
      {courseError && <p className="text-red-500">{courseError}</p>}
      {courseData && (
        <div className="mb-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold text-lg">{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p>
            <strong>Fecha:</strong> {courseData.date}
          </p>
          <p>
            <strong>Horario:</strong> {courseData.schedule}
          </p>
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
          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
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
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
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
              name="is_first_activity"
              checked={formData.is_first_activity || false}
              onChange={handleChange}
            />
            ¿Es tu primera actividad en el ODC?
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="accepts_newsletter"
              checked={formData.accepts_newsletter || false}
              onChange={handleChange}
            />
            Quiero recibir información sobre nuevos cursos periódicamente
          </label>
        </div>

        {/* Lista de menores */}
        {includeMinor && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Menores</h3>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nombre del menor"
                value={minor.name}
                onChange={handleMinorChange}
                className="border p-2 rounded-md"
              />
              <input
                type="number"
                name="age"
                placeholder="Edad"
                value={minor.age}
                onChange={handleMinorChange}
                className="border p-2 rounded-md"
              />
              <button
                type="button"
                onClick={addMinor}
                className="bg-orange text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
            </div>
            {minorError && <p className="text-red-500">{minorError}</p>}
            <ul>
              {(minors || []).map((minor, index) => (
                <li key={index}>
                  {minor.name} - {minor.age} años
                </li>
              ))}
            </ul>
          </div>
        )}
      
      </form>
    </div>
  );
};

export default MainForm;

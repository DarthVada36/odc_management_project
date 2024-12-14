import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCourseById } from "../services/coursesServices";

const MainForm = ({
  setIncludeMinor,
  includeMinor,
  formData,
  setFormData,
  onAddMinor,
  minors = [],
  courseId,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const [courseData, setCourseData] = useState(null);
  const [courseError, setCourseError] = useState("");
  const [minor, setMinor] = useState({ name: "", age: "" });
  const [minorError, setMinorError] = useState("");
  const [adult, setAdult] = useState({ name: "", age: "", gender: "", email: "" });
  const [adultError, setAdultError] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getCourseById(courseId);
        setCourseData(course);
        setFormData((prevData) => ({
          ...prevData,
          courseId: course.id,
          minors: prevData.minors || [],
          adults: prevData.adults || [],
        }));
        setCourseError("");
      } catch (error) {
        setCourseError(error.message);
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

  const handleAdultChange = (e) => {
    const { name, value } = e.target;
    setAdult((prev) => ({ ...prev, [name]: value }));
  };

  const validateMinor = () => {
    if (!minor.name || !minor.age) {
      setMinorError("Todos los campos de menores son obligatorios.");
      return false;
    }
    setMinorError("");
    return true;
  };

  const validateAdult = () => {
    if (!adult.name || !adult.age || !adult.gender || !adult.email) {
      setAdultError("Todos los campos de adultos son obligatorios.");
      return false;
    }
    setAdultError("");
    return true;
  };

  const addMinor = () => {
    if ((formData.minors || []).length >= 3) return;
    if (validateMinor()) {
      const updatedMinors = [...(formData.minors || []), minor];
      setFormData({ ...formData, minors: updatedMinors });
      setMinor({ name: "", age: "" });
    }
  };

  const addAdult = () => {
    if ((formData.adults || []).length >= 1) return;
    if (validateAdult()) {
      const updatedAdults = [...(formData.adults || []), adult];
      setFormData({ ...formData, adults: updatedAdults });
      setAdult({ name: "", age: "", gender: "", email: "" });
    }
  };

  return (
    <div className="p-6 border border-orange bg-light shadow-md w-full max-w-screen">
      <h2 className="font-semibold text-lg mb-4 text-orange">Datos Personales</h2>
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
              checked={includeAdult}
              onChange={() => setIncludeAdult(!includeAdult)}
            />
            Con un adulto acompañante
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
            {(formData.minors || []).length < 3 ? (
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
            ) : (
              <p className="text-red-500 mt-4">
                Límite máximo de menores inscritos alcanzado.
              </p>
            )}
            {minorError && <p className="text-red-500">{minorError}</p>}
            <ul>
              {(formData.minors || []).map((minor, index) => (
                <li key={index}>
                  {minor.name} - {minor.age} años
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lista de adultos */}
        {includeAdult && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Adulto Acompañante</h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nombre del acompañante"
                value={adult.name}
                onChange={handleAdultChange}
                className="border p-2 rounded-md"
              />
              <input
                type="number"
                name="age"
                placeholder="Edad"
                value={adult.age}
                onChange={handleAdultChange}
                className="border p-2 rounded-md"
              />
              <select
                name="gender"
                value={adult.gender}
                onChange={handleAdultChange}
                className="border p-2 rounded-md"
              >
                <option value="">Seleccionar género</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
                <option value="otros generos">Otro</option>
              </select>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={adult.email}
                onChange={handleAdultChange}
                className="border p-2 rounded-md"
              />
              <button
                type="button"
                onClick={addAdult}
                className="bg-orange text-white px-4 py-2 rounded-md"
              >
                Agregar Adulto
              </button>
              {adultError && <p className="text-red-500">{adultError}</p>}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MainForm;

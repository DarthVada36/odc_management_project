import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCourseById } from "../services/coursesServices";
import plus from "../assets/icons/plus.svg";
import minus from "../assets/icons/minus.svg";

const MainForm = ({
  setIncludeMinor,
  includeMinor,
  setIncludeAdult,
  includeAdult,
  formData,
  setFormData,
  onAddMinor,
  minors = [],
  onAddAdult,
  adult,
  onRemoveAdult,
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
  const [adultData, setAdultData] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
  });
  const [adultError, setAdultError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getCourseById(courseId);
        setCourseData(course);
        setFormData((prevData) => ({
          ...prevData,
          courseId: course.id,
          minors: prevData.minors || [],
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
    setAdultData((prev) => ({ ...prev, [name]: value }));
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
    if (
      !adultData.fullname ||
      !adultData.age ||
      !adultData.gender ||
      !adultData.email
    ) {
      setAdultError(
        "Todos los campos del adulto acompañante son obligatorios."
      );
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
      onAddMinor(minor);
      setMinor({ name: "", age: "" });
    }
  };

  const addAdult = () => {
    if (validateAdult()) {
      onAddAdult(adultData);
      setAdultData({ fullname: "", age: "", gender: "", email: "" });
    }
  };

  return (
    <div className="w-full m-1 p-2 border shadow-md border-orange bg-white max-w-screen">
      <h2 className="mb-2 text-lg font-semibold text-orange">
        Datos Personales
      </h2>
      {courseError && <p className="text-red-500">{courseError}</p>}
      {courseData && (
        <div className="p-4 mb-2  bg-white">
          <h3 className="text-base font-bold">{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p>
            <strong>Fecha:</strong> {courseData.date}
          </p>
          <p>
            <strong>Horario:</strong> {courseData.schedule}
          </p>
        </div>
      )}
      <form className="flex flex-col gap-4 text-sm">
        {/* Nombre Completo */}
        <div>
          <label className="block mb-1 font-medium">Nombre Completo:</label>
          <input
            className="w-full p-2  transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
            {...register("fullname", {
              required: "Este campo es obligatorio",
            })}
            onChange={handleChange}
            value={formData.fullname || ""}
          />
          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email:</label>
          <input
            className="w-full p-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Por favor, ingresa un email válido",
              },
            })}
            onChange={handleChange}
            value={formData.email || ""}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Género y Edad */}
<div className="flex flex-col sm:flex-row items-start justify-start gap-4 mt-2">
  <div className="w-full sm:w-1/2 sm:flex sm:gap-4">
    <label htmlFor="gender" className="block">Género:</label>
    <select
      id="gender"
      name="gender"
      value={formData.gender || ""}
      onChange={handleChange}
      className="flex-1 p-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
    >
      <option value="">Seleccionar</option>
      <option value="mujer">Mujer</option>
      <option value="hombre">Hombre</option>
      <option value="otros generos">Otro</option>
    </select>
  </div>

  <div className="w-full sm:w-1/2 sm:flex sm:gap-4">
    <label htmlFor="age" className="block">Edad:</label>
    <input
      id="age"
      name="age"
      type="number"
      value={formData.age || ""}
      onChange={handleChange}
      className="flex-1 p-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
    />
  </div>
</div>



        {/* Checkboxes */}
<div className="flex flex-col gap-4 m-2 sm:items-start">
  <label className="flex items-center gap-2 cursor-pointer w-full">
    <input
      type="checkbox"
      checked={formData.is_first_activity || false}
      onChange={handleChange}
      name="is_first_activity"
      className="hidden peer"
    />
    <span
      className="w-6 h-6 sm:w-8 sm:h-8 bg-no-repeat bg-center"
      style={{
        backgroundImage: formData.is_first_activity
          ? "url('/src/assets/icons/orange-check.png')"
          : "url('/src/assets/icons/orange-check-white.png')",
      }}
    ></span>
    Es mi primera actividad en el ODC
  </label>

  <label className="flex items-center gap-2 cursor-pointer w-full">
    <input
      type="checkbox"
      checked={formData.accepts_newsletter || false}
      onChange={handleChange}
      name="accepts_newsletter"
      className="hidden peer"
    />
    <span
      className="w-6 h-6 sm:w-8 sm:h-8 bg-no-repeat bg-center"
      style={{
        backgroundImage: formData.accepts_newsletter
          ? "url('/src/assets/icons/orange-check.png')"
          : "url('/src/assets/icons/orange-check-white.png')",
      }}
    ></span>
    Inscribirme al Newsletter
  </label>

  <label className="flex items-center gap-2 cursor-pointer w-full">
    <input
      type="checkbox"
      checked={includeMinor}
      onChange={() => setIncludeMinor(!includeMinor)}
      className="hidden peer"
    />
    <span
      className="w-6 h-6 sm:w-8 sm:h-8 bg-no-repeat bg-center"
      style={{
        backgroundImage: includeMinor
          ? "url('/src/assets/icons/orange-check.png')"
          : "url('/src/assets/icons/orange-check-white.png')",
      }}
    ></span>
    Añadir menores de 14 años
  </label>

  <label className="flex items-center gap-2 cursor-pointer w-full">
    <input
      type="checkbox"
      checked={includeAdult}
      onChange={() => setIncludeAdult(!includeAdult)}
      className="hidden peer"
    />
    <span
      className="w-6 h-6 sm:w-8 sm:h-8 bg-no-repeat bg-center"
      style={{
        backgroundImage: includeAdult
          ? "url('/src/assets/icons/orange-check.png')"
          : "url('/src/assets/icons/orange-check-white.png')",
      }}
    ></span>
    Con un adulto acompañante
  </label>
</div>





        {/* Formulario para menores */}
        {includeMinor && (
          <div className="mt-1">
            <h3 className="mb-2 text-lg font-bold">Menores de 14 años</h3>
            {(formData.minors || []).length < 3 ? (
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del menor"
                  value={minor.name}
                  onChange={handleMinorChange}
                  className=" p-2 mb-4 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0 "
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Edad"
                  value={minor.age}
                  onChange={handleMinorChange}
                  className=" p-2 mb-4 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0 "
                />
                <button
                  type="button"
                  onClick={addMinor}
                  className=" p-1 mt-1 w-8 h-8 text-black  hover:bg-opacity-80 bg-orange font-semibold"
                >
                  <img src={plus} alt="plus" className="w-6 h-6 " />
                </button>
              </div>
            ) : (
              <p className="mt-4 text-red-500">
                Límite máximo de menores inscritos alcanzado.
              </p>
            )}
            {minorError && <p className="text-red-500">{minorError}</p>}
            <ul>
              {(formData.minors || []).map((minor, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>
                    {minor.name} - {minor.age} años
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedMinors = formData.minors.filter(
                        (_, i) => i !== index
                      );
                      setFormData({
                        ...formData,
                        minors: updatedMinors,
                      });
                    }}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    <img
                      src={minus}
                      alt="minus"
                      className="w-6 my-1 mr-3 bg-orange h-6 font-bold"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Segunda parte del formulario para el adulto acompañante */}
        {includeAdult && (
          <div className="mt-1">
            <h3 className="mb-1 text-lg font-bold">Adulto Acompañante</h3>
            <div className="flex flex-wrap gap-1">
              <label className="block mb-0 font-medium">Nombre Completo:</label>
              <input
                className="flex flex-wrap p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                name="fullname"
                value={adultData.fullname || ""}
                onChange={(e) =>
                  setAdultData((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
                placeholder="Nombre Completo"
                required
              />
            </div>
            <div className="mt-1">
              <label className="block font-medium">Email:</label>
              <input
                className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                type="email"
                name="email"
                value={adultData.email || ""}
                onChange={(e) =>
                  setAdultData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="Correo Electrónico"
                required
              />
            </div>
            <div className="flex flex-wrap items-center mt-2 gap-4">
              <div className="w-full flex-wrap sm:w-auto">
                <label htmlFor="gender">Género:</label>
                <select
                  id="gender"
                  name="gender"
                  value={adultData.gender || ""}
                  onChange={(e) =>
                    setAdultData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="flex p-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="mujer">Mujer</option>
                  <option value="hombre">Hombre</option>
                  <option value="otros generos">Otro</option>
                </select>
              </div>

              <div className="w-full sm:w-auto">
                <label htmlFor="age">Edad:</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={adultData.age || ""}
                  onChange={(e) =>
                    setAdultData((prev) => ({
                      ...prev,
                      age: e.target.value,
                    }))
                  }
                  className="flex p-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                  placeholder="Edad"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addAdult}
              className="px-4 py-2 mt-4 text-black bg-orange  hover:bg-opacity-80 font-semibold"
            >
              Agregar Adulto
            </button>
            {adultError && <p className="text-red-500">{adultError}</p>}
            {adult && (
              <div className="p-2 mt-2 border">
                <p>
                  <strong>Nombre:</strong> {adult.fullname}
                </p>
                <p>
                  <strong>Edad:</strong> {adult.age}
                </p>
                <p>
                  <strong>Email:</strong> {adult.email}
                </p>
                <p>
                  <strong>Género:</strong> {adult.gender}
                </p>
                <button
                  type="button"
                  onClick={onRemoveAdult}
                  className="mt-2 text-orange font-semibold hover:underline"
                >
                  Eliminar Adulto
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default MainForm;

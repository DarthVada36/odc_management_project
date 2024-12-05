import React, { useState, useEffect } from "react";
import MainForm from "../components/MainForm";
import MinorForm from "../components/MinorForm";
import AdultCompanionForm from "../components/AdultCompanionForm";
import { createEnrollment } from "../services/enrollmentServices";
import { createMinor } from "../services/minorServices";
import { getCourseById } from "../services/coursesServices";
import formImage from "../assets/img/imageform.svg";

const RegisterPage = () => {
  const [includeMinor, setIncludeMinor] = useState(false);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [formData, setFormData] = useState({});
  const [minors, setMinors] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  // Obtener el título del curso al cargar la página
  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const course = await getCourseById(101); // Cambia el ID según sea necesario
        setCourseTitle(course.title || "Curso no encontrado");
      } catch (error) {
        console.error("Error al cargar el curso:", error.message);
        setResponseMessage("Error al cargar la información del curso.");
      }
    };
    fetchCourseTitle();
  }, []);

  // Manejo de formulario principal
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  // Añadir menor
  const handleAddMinor = (minorData) => {
    setMinors((prev) => [...prev, minorData]);
  };

  // Añadir acompañante adulto
  const handleAddCompanion = (companionData) => {
    setCompanions((prev) => [...prev, companionData]);
  };

  // Enviar datos al backend
  const handleSendToBackend = async () => {
    // Validaciones previas
    const requiredFields = ["fullname", "email", "age", "gender"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setResponseMessage(
          `El campo "${field}" es obligatorio y no puede estar vacío.`
        );
        return;
      }
    }

    if (includeMinor && minors.length === 0) {
      setResponseMessage(
        "Por favor, agrega al menos un menor si seleccionaste la opción de acompañante menor."
      );
      return;
    }

    if (includeAdult && companions.length === 0) {
      setResponseMessage(
        "Por favor, agrega al menos un acompañante adulto si seleccionaste la opción de acompañante adulto."
      );
      return;
    }

    setIsLoading(true);
    setResponseMessage("");

    try {
      // Crear inscripción principal
      const mainEnrollment = await createEnrollment(formData);
      const groupId = mainEnrollment?.group_id;

      if (!groupId) {
        throw new Error("No se pudo obtener el group_id desde el servidor.");
      }

      // Crear inscripciones para menores y acompañantes en paralelo
      const minorRequests = includeMinor
        ? minors.map((minor) => createMinor({ ...minor, group_id: groupId }))
        : [];
      const companionRequests = includeAdult
        ? companions.map((companion) =>
            createEnrollment({ ...companion, group_id: groupId })
          )
        : [];

      await Promise.all([...minorRequests, ...companionRequests]);

      setResponseMessage("Formulario enviado con éxito.");
      setFormData({});
      setMinors([]);
      setCompanions([]);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setResponseMessage(
        `Error al enviar los datos: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font flex-col items-center justify-center px-4">
      <h1 className="text-orange font-sans text-center text-3xl font-bold">
        Solicitud de inscripción a "{courseTitle}"
      </h1>
      <div className="flex p-8 m-10 border border-orange flex-col gap-6 lg:flex-col lg:gap-4 px-4">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6">
          <div className="flex-1 lg:flex justify-center">
            <MainForm
              setIncludeMinor={setIncludeMinor}
              setIncludeAdult={setIncludeAdult}
              includeMinor={includeMinor}
              includeAdult={includeAdult}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="flex-1">
            <img
              src={formImage}
              alt="Formulario Imagen"
              className="w-[615px] h-[616px] lg:max-w-full object-contain"
            />
          </div>
        </div>

        <button
          className="bg-orange text-white px-4 py-2 rounded-md font-semibold mt-4 disabled:opacity-50"
          onClick={handleSendToBackend}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Siguiente"}
        </button>

        {responseMessage && (
          <p className="text-center text-red-500 mt-4">{responseMessage}</p>
        )}

        <div className="flex flex-col gap-6">
          {includeMinor && <MinorForm onAddMinor={handleAddMinor} />}
          {includeAdult && <AdultCompanionForm onAddCompanion={handleAddCompanion} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

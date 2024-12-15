import React, { useState, useEffect } from "react";
import MainForm from "../components/MainForm";
import Summary from "../components/SummaryInscriptionForm"; // Asegúrate de que el componente está importado
import { createEnrollment } from "../services/enrollmentServices";
import { getCourseById } from "../services/coursesServices";
import formImage from "../assets/img/imageform.svg";
import { useParams } from "react-router-dom";

const FormPage = () => {
  const { id } = useParams(); // Capturar el ID del curso desde la URL
  const [includeMinor, setIncludeMinor] = useState(false);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [formData, setFormData] = useState({});
  const [minors, setMinors] = useState([]);
  const [adult, setAdult] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [responseMessage, setResponseMessage] = useState(null); // Mensajes de respuesta
  const [showSummary, setShowSummary] = useState(false); // Controlar si mostrar el resumen

  // Obtener el título del curso al cargar la página
  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const course = await getCourseById(id);
        setCourseTitle(course.title || "Curso no encontrado");
        setFormData((prev) => ({ ...prev, id_course: id }));
      } catch (error) {
        setResponseMessage({
          type: "error",
          text: "Error al cargar el curso.",
        });
      }
    };
    fetchCourseTitle();
  }, [id]);

  const validateFormData = () => {
    const requiredFields = ["fullname", "email", "age", "gender", "id_course"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setResponseMessage({
          type: "error",
          text: `El campo "${field}" es obligatorio.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleAddMinor = (minorData) => {
    setMinors((prev) => [...prev, minorData]);
  };

  const handleAddAdult = (adultData) => {
    setAdult(adultData); // Solo se permite un adulto
  };

  const handleRemoveAdult = () => {
    setAdult(null); // Eliminar al adulto
  };

  const handleShowSummary = () => {
    if (validateFormData()) {
      setShowSummary(true); // Activar el resumen
    }
  };

  const handleSendToBackend = async () => {
    if (!validateFormData()) return;

    setIsLoading(true);
    setResponseMessage(null);

    try {
      const payload = {
        ...formData,
        minors,
        adults: adult ? [adult] : [], // Incluir adulto si existe
      };

      const response = await createEnrollment(payload);

      setResponseMessage({
        type: "success",
        text: "Inscripción realizada con éxito.",
      });

      // Reiniciar formulario
      setFormData({});
      setMinors([]);
      setAdult(null);
      setShowSummary(false); // Ocultar el resumen tras enviar
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ha ocurrido un error inesperado.";
      setResponseMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font flex-col items-center justify-center px-4">
      <h1 className="text-orange font-sans text-center text-3xl font-bold">
        Solicitud de inscripción a {courseTitle}
      </h1>
      <div className="flex p-8 m-10 border border-orange flex-col gap-6 lg:flex-col lg:gap-4 px-4">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6">
          <div>
            <MainForm
              courseId={id}
              setIncludeMinor={setIncludeMinor}
              includeMinor={includeMinor}
              setIncludeAdult={setIncludeAdult}
              includeAdult={includeAdult}
              formData={formData}
              setFormData={setFormData}
              onAddMinor={handleAddMinor}
              minors={minors}
              onAddAdult={handleAddAdult}
              adult={adult}
              onRemoveAdult={handleRemoveAdult}
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

        {!showSummary ? (
          <button
            className="bg-orange text-white px-4 py-2 rounded-md font-semibold mt-4 disabled:opacity-50"
            onClick={handleShowSummary} // Mostrar el resumen
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Siguiente"}
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold mt-4 disabled:opacity-50"
            onClick={handleSendToBackend} // Enviar al backend
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Confirmar Inscripción"}
          </button>
        )}

        {responseMessage && (
          <p
            className={`text-center mt-4 ${
              responseMessage.type === "error"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {responseMessage.text}
          </p>
        )}
      </div>

      {/* Renderizar el resumen condicionalmente */}
      {showSummary && <Summary formData={formData} minors={minors} adult={adult} courseTitle={courseTitle}
  handleSubmit={handleSendToBackend} />}
    </div>
  );
};

export default FormPage;

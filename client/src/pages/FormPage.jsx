import React, { useState, useEffect } from "react";
import MainForm from "../components/MainForm";
import { createEnrollment } from "../services/enrollmentServices";
import { getCourseById } from "../services/coursesServices";
import formImage from "../assets/img/imageform.svg";
import { useParams } from "react-router-dom";
import CoockieModal from "../components/CoockieModal";
const FormPage = () => {
  const { id } = useParams(); // Capturar el ID del curso desde la URL
  const [includeMinor, setIncludeMinor] = useState(false);
  const [formData, setFormData] = useState({});
  const [minors, setMinors] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [responseMessage, setResponseMessage] = useState(null); // Mensajes de respuesta

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

const handleSendToBackend = async () => {
  if (!validateFormData()) return;

  setIsLoading(true);
  setResponseMessage(null);

  try {
    const mainEnrollment = await createEnrollment(formData);

    // Obtener el enrollment_id de la respuesta del servidor
    const enrollmentId = mainEnrollment?.enrollment_id; // Cambia "enrollment_id" si el campo tiene otro nombre
    if (!enrollmentId) {
      throw new Error('No se pudo obtener el enrollment_id del servidor.');
    }

    // Crear menores asociados al enrollment_id
    const minorRequests = minors.map((minor) =>
      createMinor({ ...minor, enrollment_id: enrollmentId })
    );
  
    await Promise.all([...minorRequests]);

    setResponseMessage({
      type: 'success',
      text: 'Inscripción realizada con éxito.',
    });

    setFormData({});
    setMinors([]);
    
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Ha ocurrido un error inesperado.';
      setResponseMessage({
        type: 'success',
        text: 'Inscripción realizada con éxito.',
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
        formData={formData}
        setFormData={setFormData}
        onAddMinor={handleAddMinor}
        minors={minors}
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
          <p
            className={`text-center mt-4 ${
              responseMessage.type === "tas bien wey y algo esta mal del front"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {responseMessage.text}
          </p>
        )}
      </div>
      <CoockieModal />
    </div>
  );
};

export default FormPage;

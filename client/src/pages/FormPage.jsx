import React, { useState, useEffect } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';
import { createEnrollment } from '../services/enrollmentServices';
import { createMinor } from '../services/minorServices';
import { getCourseById } from '../services/coursesServices';
import formImage from '../assets/img/imageform.svg';

const FormPage = () => {
  const [includeMinor, setIncludeMinor] = useState(false);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [formData, setFormData] = useState({});
  const [minors, setMinors] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');

  // Obtener el título del curso al cargar la página
  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const course = await getCourseById(101); // Cambiar ID según tu lógica
        setCourseTitle(course.title || 'Curso no encontrado');
      } catch (error) {
        setResponseMessage({
          type: 'error',
          text: 'Error al cargar el curso.',
        });
      }
    };
    fetchCourseTitle();
  }, []);

  // Validaciones generales
  const validateFormData = () => {
    const requiredFields = ['fullname', 'email', 'age', 'gender'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setResponseMessage({
          type: 'error',
          text: `El campo "${field}" es obligatorio.`,
        });
        return false;
      }
    }

    if (includeMinor && minors.length === 0) {
      setResponseMessage({
        type: 'error',
        text: 'Por favor, agrega al menos un menor si seleccionaste la opción.',
      });
      return false;
    }

    if (includeAdult && companions.length === 0) {
      setResponseMessage({
        type: 'error',
        text: 'Por favor, agrega al menos un acompañante adulto.',
      });
      return false;
    }

    return true;
  };

  // Añadir menores
  const handleAddMinor = (minorData) => {
    setMinors((prevMinors) => [...prevMinors, minorData]);
  };

  // Añadir acompañantes adultos
  const handleAddCompanion = (companionData) => {
    setCompanions((prevCompanions) => [...prevCompanions, companionData]);
  };

  // Enviar datos al backend
  const handleSendToBackend = async () => {
    // Utiliza la función global validateFormData directamente
    if (!validateFormData()) return;

    setIsLoading(true);
    setResponseMessage(null);

    try {
      // Crear inscripción principal
      const mainEnrollment = await createEnrollment({
        ...formData,
        id_course: formData.id_course || 101, // Asegurar id_course
      });

      // Validar si se devolvió un group_id (solo en caso de acompañantes)
      const groupId = mainEnrollment?.group_id;
      if ((includeMinor || includeAdult) && !groupId) {
        throw new Error('No se pudo obtener el group_id del servidor.');
      }

      // Preparar solicitudes de inscripción adicionales
      const minorRequests = minors.map((minor) =>
        createMinor({ ...minor, group_id: groupId })
      );
      const companionRequests = companions.map((companion) =>
        createEnrollment({ ...companion, group_id: groupId })
      );

      // Enviar solicitudes concurrentes
      await Promise.all([...minorRequests, ...companionRequests]);

      // Mensaje de éxito
      setResponseMessage({
        type: 'success',
        text: 'Inscripción realizada con éxito.',
      });

      // Reiniciar los formularios solo si todo fue exitoso
      setFormData({});
      setMinors([]);
      setCompanions([]);
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ha ocurrido un error inesperado.';
      setResponseMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex font flex-col items-center justify-center px-4'>
      <h1 className='text-orange font-sans text-center text-3xl font-bold'>
        Solicitud de inscripción a {courseTitle}
      </h1>
      <div className='flex p-8 m-10 border border-orange flex-col gap-6 lg:flex-col lg:gap-4 px-4'>
        <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6'>
          <div>
            <MainForm
              courseId={101}
              setIncludeMinor={setIncludeMinor}
              setIncludeAdult={setIncludeAdult}
              includeMinor={includeMinor}
              includeAdult={includeAdult}
              formData={formData}
              setFormData={setFormData}
            />

            {includeMinor && <MinorForm onAddMinor={handleAddMinor} />}
            {includeAdult && (
              <AdultCompanionForm onAddCompanion={handleAddCompanion} />
            )}
          </div>
          <div className='flex-1'>
            <img
              src={formImage}
              alt='Formulario Imagen'
              className='w-[615px] h-[616px] lg:max-w-full object-contain'
            />
          </div>
        </div>

        <button
          className='bg-orange text-white px-4 py-2 rounded-md font-semibold mt-4 disabled:opacity-50'
          onClick={handleSendToBackend}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Siguiente'}
        </button>

        {responseMessage && (
          <p
            className={`text-center mt-4 ${
              responseMessage.type === 'error'
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {responseMessage.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormPage;

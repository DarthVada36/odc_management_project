import React, { useState, useEffect } from 'react';
import MainForm from '../components/MainForm';
import { createEnrollment } from '../services/enrollmentServices';
import { getCourseById } from '../services/coursesServices';
import formImage from '../assets/img/imageform.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CookieModal from '../components/CoockieModal';
import Summary from '../components/SummaryInscriptionForm'; // Añadir esta línea

const FormPage = () => {
    const { id } = useParams(); // Capturar el ID del curso desde la URL
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [includeMinor, setIncludeMinor] = useState(false);
    const [includeAdult, setIncludeAdult] = useState(false);
    const [formData, setFormData] = useState({});
    const [minors, setMinors] = useState([]);
    const [adult, setAdult] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseDate, setCourseDate] = useState('');
    const [courseSchedule, setCourseSchedule] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [responseMessage, setResponseMessage] = useState(null); // Mensajes de respuesta
    const [showSummary, setShowSummary] = useState(false); // Controlar si mostrar el resumen
    const [showCookiesModal, setShowCookiesModal] = useState(true); // Estado para mostrar/ocultar el modal

    useEffect(() => {
        const fetchCourseTitle = async () => {
            try {
                const course = await getCourseById(id);
                setCourseTitle(course.title || 'Curso no encontrado');
                setCourseDescription(course.description || 'Descripción no disponible');
                setCourseDate(course.date || 'Fecha no especificada');
                setCourseSchedule(course.schedule || 'Horario no especificado');
                setFormData((prev) => ({ ...prev, id_course: id }));
            } catch (error) {
                setResponseMessage({
                    type: 'error',
                    text: 'Error al cargar el curso.',
                });
            }
        };
        fetchCourseTitle();
    }, [id]);

    const validateFormData = () => {
        const requiredFields = ['fullname', 'email', 'age', 'gender', 'id_course'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setResponseMessage({
                    type: 'error',
                    text: `El campo "${field}" es obligatorio.`,
                });
                return false;
            }
        }
        return true
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
                type: 'success',
                text: 'Inscripción realizada con éxito.',
            });

            // Reiniciar formulario
            setFormData({});
            setMinors([]);
            setAdult(null);
            setShowSummary(false); // Ocultar el resumen tras enviar

            // Redirigir basado en el estado de autenticación
            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 2000); // Esperar 2 segundos para que el usuario vea el mensaje de éxito
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Ha ocurrido un error inesperado.';
            setResponseMessage({
                type: 'error',
                text: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-4 font">
            <h1 className="font-sans mt-10 text-3xl font-bold text-center text-orange">
                Solicitud de inscripción a {courseTitle}
            </h1>
            <div className="flex flex-col gap-6 p-8 px-4 m-10 border border-orange lg:flex-col lg:gap-4">
                <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between">
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
                            className="w-[615px] h-[616px] pl-14 lg:max-w-full object-contain"
                        />
                    </div>

                </div>

                {!showSummary ? (
                    <button
                        className="px-4 py-2 mt-4 font-semibold text-white bg-orange disabled:opacity-50"
                        onClick={handleShowSummary} // Mostrar el resumen
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Siguiente'}
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 mt-4 font-semibold text-white bg-green-500 disabled:opacity-50"
                        onClick={handleSendToBackend} // Enviar al backend
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Confirmar Inscripción'}
                    </button>
                )}

                {responseMessage && (
                    <p
                        className={`text-center mt-4 ${responseMessage.type === 'error'
                                ? 'text-red-500'
                                : 'text-green-500'
                            }`}
                    >
                        {responseMessage.text}
                    </p>
                )}
            </div>

            {/* Renderizar el modal condicionalmente */}
            {showCookiesModal && (
                <CookieModal onClose={() => setShowCookiesModal(false)} />
            )}

            {/* Renderizar el resumen condicionalmente */}
            {showSummary && (
                <Summary
                    formData={formData}
                    minors={minors}
                    adult={adult}
                    courseTitle={courseTitle}
                    courseDescription={courseDescription}
                    courseDate={courseDate}
                    courseSchedule={courseSchedule}
                    handleSubmit={handleSendToBackend}
                />
            )}
        </div>
    )

}

export default FormPage

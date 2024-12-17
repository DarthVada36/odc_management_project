import React, { useState, useEffect } from 'react';
import MainForm from '../components/MainForm';
import { createEnrollment } from '../services/enrollmentServices';
import { getCourseById } from '../services/coursesServices';
import formImage from '../assets/img/imageform.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CookieModal from '../components/CoockieModal';
import Summary from '../components/SummaryInscriptionForm';

const FormPage = () => {
    const { id } = useParams();
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
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [showCookiesModal, setShowCookiesModal] = useState(true);

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
        return true;
    };

    const handleAddMinor = (minorData) => {
        setMinors((prev) => [...prev, minorData]);
    };

    const handleAddAdult = (adultData) => {
        setAdult(adultData);
    };

    const handleRemoveAdult = () => {
        setAdult(null);
    };

    const handleShowSummary = () => {
        if (validateFormData()) {
            setShowSummary(true);
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
                adults: adult ? [adult] : [],
            };

            await createEnrollment(payload);

            setResponseMessage({
                type: 'success',
                text: 'Inscripción realizada con éxito.',
            });

            setFormData({});
            setMinors([]);
            setAdult(null);
            setShowSummary(false);

            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 2000);
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
    };

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="font-sans mt-10 text-3xl font-bold text-center text-orange">
                Solicitud de inscripción a {courseTitle}
            </h1>

            {/* Contenedor con imagen de fondo, visible solo en pantallas grandes */}
            <div
                className="desktop:block flex-wrap lg:flex-nowrap lg:gap-4 p-4 m-4 border-orange w-full max-w-[1200px] bg-cover bg-center"
                style={{ backgroundImage: `url(${formImage})`}}
            >
                {/* Formulario */}
                <div className="flex-1 w-full lg:w-1/2 min-w-[50%] bg-white bg-opacity-90 p-4  shadow-lg">
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
            </div>

            {/* Botones */}
            <div className="w-full max-w-[1200px] px-4">
                {!showSummary ? (
                    <button
                        className="w-full px-4 py-2 mt-4 mb-10 font-semibold text-white bg-orange disabled:opacity-50"
                        onClick={handleShowSummary}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Siguiente'}
                    </button>
                ) : (
                    <button
                        className="w-full px-4 py-2 mt-4 font-semibold text-white bg-green-500 disabled:opacity-50"
                        onClick={handleSendToBackend}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Confirmar Inscripción'}
                    </button>
                )}
            </div>

            {/* Mensajes */}
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

            {/* Modales */}
            {showCookiesModal && (
                <CookieModal onClose={() => setShowCookiesModal(false)} />
            )}

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
    );
};

export default FormPage;

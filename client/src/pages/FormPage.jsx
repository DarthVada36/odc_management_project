import React, { useState, useEffect } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';
import { createEnrollment } from '../services/enrollmentServices';
import { createMinor } from '../services/minorServices';
import { getCourseById } from '../services/coursesServices';
import formImage from '../assets/img/imageform.svg';

const RegisterPage = () => {
    const [includeMinor, setIncludeMinor] = React.useState(false);
  const [includeAdult, setIncludeAdult] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const [minors, setMinors] = useState([]); // Lista de menores
    const [companions, setCompanions] = useState([]); // Lista de acompañantes adultos
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [responseMessage, setResponseMessage] = useState('');
    const [courseTitle, setCourseTitle] = useState('');

    // Obtener el título del curso al cargar la página
    useEffect(() => {
        const fetchCourseTitle = async () => {
            try {
                const course = await getCourseById(101); // ID del curso
                setCourseTitle(course.title);
            } catch (error) {
                console.error('Error al cargar el curso:', error.message);
            }
        };
        fetchCourseTitle();
    }, []);

    // Manejar el envío del formulario principal
    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    // Manejar la adición de menores
    const handleAddMinor = (minorData) => {
        setMinors((prev) => [...prev, minorData]);
    };

    // Manejar la adición de acompañantes adultos
    const handleAddCompanion = (companionData) => {
        setCompanions((prev) => [...prev, companionData]);
    };

    // Enviar todos los datos al backend
    const handleSendToBackend = async () => {
        if (!formData.fullname || !formData.email || !formData.age || !formData.gender) {
            setResponseMessage('Por favor, completa todos los campos obligatorios del formulario principal.');
            return;
        }
    
        if (includeMinor && minors.length === 0) {
            setResponseMessage('Por favor, agrega al menos un menor si seleccionaste la opción de acompañante menor.');
            return;
        }
    
        if (includeAdult && companions.length === 0) {
            setResponseMessage('Por favor, agrega al menos un acompañante adulto si seleccionaste la opción de acompañante adulto.');
            return;
        }
    
        setIsLoading(true);
        setResponseMessage('');
    
        try {
            // Crear la inscripción principal y obtener el group_id
            const mainEnrollment = await createEnrollment(formData);
            const groupId = mainEnrollment.group_id; // Suponemos que el backend retorna el group_id
    
            // Crear inscripciones para menores
            if (includeMinor && minors.length > 0) {
                for (const minor of minors) {
                    await createMinor({ ...minor, group_id: groupId });
                }
            }
    
            // Crear inscripciones para acompañantes adultos
            if (includeAdult && companions.length > 0) {
                for (const companion of companions) {
                    await createEnrollment({ ...companion, group_id: groupId });
                }
            }
    
            setResponseMessage('Formulario enviado con éxito.');
        } catch (error) {
            console.error('Error al enviar los datos:', error.message);
            setResponseMessage(`Error: ${error.message}`);
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
                        {/* Pasar el estado y las funciones como props */}
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

                {/* Botón para enviar */}
                <button
                    className="bg-orange text-white px-4 py-2 rounded-md font-semibold mt-4 disabled:opacity-50"
                    onClick={handleSendToBackend}
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Siguiente'}
                </button>

                {/* Mensaje de respuesta */}
                {responseMessage && (
                    <p className="text-center text-red-500 mt-4">{responseMessage}</p>
                )}

                {/* Formularios adicionales */}
                <div className="flex flex-col gap-6">
                    {includeMinor && (
                        <MinorForm
                            onAddMinor={handleAddMinor}
                        />
                    )}
                    {includeAdult && (
                        <AdultCompanionForm
                            onAddCompanion={handleAddCompanion}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

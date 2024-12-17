import React, { useState, useEffect } from 'react'
import MainForm from '../components/MainForm'
import { createEnrollment } from '../services/enrollmentServices'
import { getCourseById } from '../services/coursesServices'
import formImage from '../assets/img/imageform.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CookieModal from "../components/CoockieModal";
import Summary from '../components/SummaryInscriptionForm' // Añadir esta línea

const FormPage = () => {
    const { id } = useParams() // Capturar el ID del curso desde la URL
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [includeMinor, setIncludeMinor] = useState(false)
    const [includeAdult, setIncludeAdult] = useState(false)
    const [formData, setFormData] = useState({})
    const [minors, setMinors] = useState([])
    const [adult, setAdult] = useState(null)
    const [courseTitle, setCourseTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false) // Estado de carga
    const [responseMessage, setResponseMessage] = useState(null) // Mensajes de respuesta
    const [showSummary, setShowSummary] = useState(false) // Controlar si mostrar el resumen
    const [showCookiesModal, setShowCookiesModal] = useState(true); // Estado para mostrar/ocultar el modal
    


    useEffect(() => {
        const fetchCourseTitle = async () => {
            try {
                const course = await getCourseById(id)
                setCourseTitle(course.title || 'Curso no encontrado')
                setFormData((prev) => ({ ...prev, id_course: id }))
            } catch (error) {
                setResponseMessage({
                    type: 'error',
                    text: 'Error al cargar el curso.',
                })
            }
        }
        fetchCourseTitle()
    }, [id])

    const validateFormData = () => {
        const requiredFields = [
            'fullname',
            'email',
            'age',
            'gender',
            'id_course',
        ]
        for (const field of requiredFields) {
            if (!formData[field]) {
                setResponseMessage({
                    type: 'error',
                    text: `El campo "${field}" es obligatorio.`,
                })
                return false
            }
        }
        return true
    }

    const handleAddMinor = (minorData) => {
        setMinors((prev) => [...prev, minorData])
    }

    const handleAddAdult = (adultData) => {
        setAdult(adultData) // Solo se permite un adulto
    }

    const handleRemoveAdult = () => {
        setAdult(null) // Eliminar al adulto
    }

    const handleShowSummary = () => {
        if (validateFormData()) {
            setShowSummary(true) // Activar el resumen
        }
    }

    const handleSendToBackend = async () => {
        if (!validateFormData()) return

        setIsLoading(true)
        setResponseMessage(null)

        try {
            const payload = {
                ...formData,
                minors,
                adults: adult ? [adult] : [], // Incluir adulto si existe
            }

            const response = await createEnrollment(payload)

            setResponseMessage({
                type: 'success',
                text: 'Inscripción realizada con éxito.',
            })

            // Reiniciar formulario
            setFormData({})
            setMinors([])
            setAdult(null)
            setShowSummary(false) // Ocultar el resumen tras enviar

            // Redirigir basado en el estado de autenticación
            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            }, 2000) // Esperar 2 segundos para que el usuario vea el mensaje de éxito
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Ha ocurrido un error inesperado.'
            setResponseMessage({
                type: 'error',
                text: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-4 font">
        <h1 className="font-sans mt-10 text-3xl font-bold text-center text-orange">
            Solicitud de inscripción a {courseTitle}
        </h1>
        <div className="flex flex-col lg:flex-row lg:gap-4 p-8 px-4 m-10 border border-orange w-full max-w-[1200px]">
            <div className="flex-1 lg:w-1/2 min-w-[50%] max-w-[50%]">              
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
    
            <div className="flex-1 lg:w-1/2 min-w-[50%] max-w-[50%] flex">
                <img
                    src={formImage}
                    alt="Formulario Imagen"
                    className="w-auto mr-6 object-contain max-h-full"
                />
            </div>
        </div>
    
        {!showSummary ? (
            <button
                className="px-4 py-2 mt-4 font-semibold text-white bg-orange disabled:opacity-50"
                onClick={handleShowSummary}
                disabled={isLoading}
            >
                {isLoading ? 'Cargando...' : 'Siguiente'}
            </button>
        ) : (
            <button
                className="px-4 py-2 mt-4 font-semibold text-white bg-green-500 disabled:opacity-50"
                onClick={handleSendToBackend}
                disabled={isLoading}
            >
                {isLoading ? 'Enviando...' : 'Confirmar Inscripción'}
            </button>
        )}
    
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
    
        {showCookiesModal && (
            <CookieModal onClose={() => setShowCookiesModal(false)} />
        )}
    
        {showSummary && (
            <Summary
                formData={formData}
                minors={minors}
                adult={adult}
                courseTitle={courseTitle}
                handleSubmit={handleSendToBackend}
            />
        )}
</div>
    )
    
}

export default FormPage

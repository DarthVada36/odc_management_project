import React, { useState, useEffect } from 'react'
import MainForm from '../components/MainForm'
import { createEnrollment } from '../services/enrollmentServices'
import { getCourseById } from '../services/coursesServices'
import formImage from '../assets/img/imageform.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CookieModal from '../components/CoockieModal'
import Summary from '../components/SummaryInscriptionForm'

const FormPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [includeMinor, setIncludeMinor] = useState(false)
    const [includeAdult, setIncludeAdult] = useState(false)
    const [formData, setFormData] = useState({})
    const [minors, setMinors] = useState([])
    const [adult, setAdult] = useState(null)
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseDate, setCourseDate] = useState('')
    const [courseSchedule, setCourseSchedule] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [showCookiesModal, setShowCookiesModal] = useState(true)

    useEffect(() => {
        const fetchCourseTitle = async () => {
            try {
                const course = await getCourseById(id)
                setCourseTitle(course.title || 'Curso no encontrado')
                setCourseDescription(
                    course.description || 'Descripción no disponible'
                )
                setCourseDate(course.date || 'Fecha no especificada')
                setCourseSchedule(course.schedule || 'Horario no especificado')
                setFormData((prev) => ({ ...prev, id_course: id }))
            } catch (error) {
                // Error handling will be managed by MainForm
            }
        }
        fetchCourseTitle()
    }, [id])

    const handleAddMinor = (minorData) => {
        setMinors((prev) => [...prev, minorData])
    }

    const handleAddAdult = (adultData) => {
        setAdult(adultData)
    }

    const handleRemoveAdult = () => {
        setAdult(null)
    }

    const handleShowSummary = (isValid) => {
        if (isValid) {
            setShowSummary(true)
        }
    }

    const handleSendToBackend = async () => {
        setIsLoading(true)

        try {
            const payload = {
                ...formData,
                minors,
                adults: adult ? [adult] : [],
            }

            await createEnrollment(payload)

            setFormData({})
            setMinors([])
            setAdult(null)
            setShowSummary(false)

            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            }, 2000)
        } catch (error) {
            // Error handling will be managed by MainForm
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="mt-8 mb-8 text-2xl font-bold text-center text-orange-500 sm:text-3xl font-helvetica-w20-bold">
                Solicitud de inscripción a {courseTitle}
            </h1>

            {/* Contenedor con imagen de fondo, visible solo en pantallas grandes */}
            <div
                className="hidden lg:block flex-wrap lg:flex-nowrap lg:gap-4 p-4 m-4 border-orange w-[95%] max-w-[1600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${formImage})` }}
            >
                {/* Formulario */}
                <div className="flex-1 w-full lg:w-1/2 min-w-[50%] bg-white bg-opacity-90 p-4 shadow-lg">
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
                        onValidationComplete={handleShowSummary}
                    />
                </div>
            </div>

            {/* Contenedor alternativo sin imagen de fondo para dispositivos móviles y tabletas */}
            <div className="lg:hidden w-full max-w-[1200px] p-4 m-4 border-orange">
                <div className="w-full p-4 bg-white shadow-lg bg-opacity-90">
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
                        onValidationComplete={handleShowSummary}
                    />
                </div>
            </div>

            {/* Resumen */}
            {showSummary && (
                <div className="w-[95%] max-w-[1600px] p-4 mx-4 mb-6 ">
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
                </div>
            )}

            {/* Botones */}
            <div className="w-[95%] max-w-[1600px] mb-16">
                {!showSummary ? (
                    <button
                        className="w-full px-4 py-3 mt-8 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        onClick={() =>
                            document.dispatchEvent(new Event('validateForm'))
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Siguiente'}
                    </button>
                ) : (
                    <button
                        className="w-full px-4 py-3 mt-8 font-bold text-white transition-all duration-300 bg-green-500 disabled:opacity-50 font-helvetica-w20-bold hover:bg-green-600"
                        onClick={handleSendToBackend}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Confirmar Inscripción'}
                    </button>
                )}
            </div>

            {/* Modales */}
            {showCookiesModal && (
                <CookieModal onClose={() => setShowCookiesModal(false)} />
            )}
        </div>
    )
}

export default FormPage

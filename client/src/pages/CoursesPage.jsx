import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/coursesServices';
import { useNavigate } from 'react-router-dom';
import CookieModal from "../components/CoockieModal";


const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showCookiesModal, setShowCookiesModal] = useState(true); // Estado para mostrar/ocultar el modal
    const navigate = useNavigate()

    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses()
                setCourses(data)
            } catch (err) {
                setError('No se pudieron cargar los cursos')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourses()
    }, [])

    if (isLoading) return <p>Cargando cursos...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="flex flex-col items-center px-4 mb-8 flex-grow-1">
            {' '}
            {/* Contenedor para Separar el footerpx4.separadelmargen */}
            <h1 className="w-full mt-8 mb-8 text-3xl font-bold text-center">
                Cursos Disponibles
            </h1>{' '}
            {/* texto a la izquierda */}
            <div
                className="grid justify-center w-full max-w-screen-lg gap-4 mx-auto"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '16px',
                }}
            >

                {/* Renderizar el modal condicionalmente */}
            {showCookiesModal && (
                <CookieModal onClose={() => setShowCookiesModal(false)} />
            )} 
            
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="p-4 border shadow-md "
                    >
                        <h2 className="text-lg font-semibold">
                            {course.title}
                        </h2>
                        <p className="text-gray-600">{course.description}</p>
                        <div className="mt-4 text-left">
                            <button
                                className="px-4 py-2 mt-4 font-bold text-black transition-colors  bg-orange hover:bg-black hover:text-white"
                                onClick={() =>
                                    navigate(`/inscription/${course.id}`)
                                }
                            >
                                Inscribirme
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        );
      
    
  
};

export default CoursesPage

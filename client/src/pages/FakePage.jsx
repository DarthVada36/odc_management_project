import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../services/coursesServices';
import EventCard from '../components/EventCard'; //Importo el componente EventCard


const FakePage = () => {
    // almacena los eventos cargados desde el archivo JSON
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    // Cargar cursos desde la API
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const data = await getAllCourses();
          setCourses(data);
        } catch (err) {
          setError('No se pudieron cargar los cursos');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
  
    if (isLoading) return <p>Cargando cursos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  

    return ( 
    <div className='p-4'>
        {/* Título de la página */}
        <h1 className='text-3xl font-bold text-center mb-6'>Curso1</h1>
        {/* Contenedor responsivo de la tarjetas */}
        <div className='grid gap-4 justify-center w-full'
             style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px',
              }}
        >
        {/* Mapeo de los eventos y los muestro como tarjetas */}    
        {events.map((event) => (
            <EventCard
            key={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
            description={event.description}
          />
        ))}
            
           
             
        </div>
    </div>
    );
};

export default FakePage;

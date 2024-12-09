import React, {useEffect, useState} from 'react';
//import { useNavigate } from 'react-router-dom';
//import { getAllCourses } from '../services/coursesServices';
import EventCard from '../components/EventCard'; //Importo el componente EventCard


const FakePage = () => {
    // almacena los eventos cargados desde el archivo JSON
    const events = [
        {
          id: 1,
          imageUrl: 'https://via.placeholder.com/400x320',
          title: 'Evento 1',
          description: 'Este es el primer evento.'
        },
        {
          id: 2,
          imageUrl: 'https://via.placeholder.com/400x320',
          title: 'Evento 2',
          description: 'Este es el segundo evento.'
        },
        {
          id: 3,
          imageUrl: 'https://via.placeholder.com/400x320',
          title: 'Evento 3',
          description: 'Este es el tercer evento.'
        },
        {
            id: 4,
            imageUrl: 'https://via.placeholder.com/400x320',
            title: 'Evento 1',
            description: 'Este es el primer evento.'
          },
          {
            id: 5,
            imageUrl: 'https://via.placeholder.com/400x320',
            title: 'Evento 2',
            description: 'Este es el segundo evento.'
          },
          {
            id: 6,
            imageUrl: 'https://via.placeholder.com/400x320',
            title: 'Evento 3',
            description: 'Este es el tercer evento.'
          }
      ];

    return ( 
    <div className='p-4'>
        {/* Título de la página */}
        <h1 className='text-2xl font-bold text-center mb-6'>Curso1</h1>
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

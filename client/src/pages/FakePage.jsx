import React, {useEffect, useState} from 'react';
import EventCard from '../components/EventCard'; //Importo el componente EventCard

const FakePage = () => {
    
    

    return ( 
    <div className='p-4'>
        {/* Título de la página */}
        <h1 className='text-3xl font-bold text-center mb-6'>Curso1</h1>
        {/* Contenedor responsivo de la tarjetas */}
        <div className='grid gap-4'
        {/* Cada tarjeta ocupará un espacio mínimo de 320px, si hay + espacion se ajustará automaticamente */}
        style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              }}
        >
        {/* Mapeo de los eventos y los muestro como tarjetas */}    
        {events.map((event) => (
            <div
            key={event.id} // Cada tarjeta necesita una clave única
            className='p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl'
            > 
            {/*Imagen de la tarjeta */}
            <img 
            src={event.imageUrl}
            alt={event.title}
            className='w-full h-40 object-cover rounded-t-lg'
            />
            {/*Título de la tarjeta */}
            <h2 className='text-lg font-semibold mt-4'>{event.title}</h2>
            {/*Descripción de la tarjeta*/}
            <p className='text-gray-600 mt-2'>{event.description}</p>
            </div>
        ))}
            
        </div>
    </div>
    )
}

export default FakePage;

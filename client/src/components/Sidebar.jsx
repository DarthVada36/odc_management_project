import React from 'react';
const Sidebar = () => {
    return (
        <div className='bg-black text-white p-4 border-orange w-full md:w-1/4 min-h-screen flex flex-col'>
            {/* Título del Sidebar */}
            <div className='text-center text-orange font-bold text-xl mb-4 p-4'>Panel Administrador</div>
            {/* Línea separadora naranja */}
            <div className="border-t-2 border-orange"></div>
             {/* Lista de opciones */}
            <ul className='flex flex-col gap-4 p-8'>
            
                <li className='text-center font-bold hover:text-orange transition-colors cursor-pointer'>Dasboard</li>
                <div className="border-t-2 border-orange mt-2"></div>
                <li className='text-center font-bold hover:text-orange transition-colors cursor-pointer'>Administradores</li>
                <div className="border-t-2 border-orange mt-2"></div>
                <li className='text-center font-bold hover:text-orange transition-colors cursor-pointer'>Cursos</li>
                <div className="border-t-2 border-orange mt-2"></div>
                <li className='text-center font-bold hover:text-orange transition-colors cursor-pointer'>Inscripciones</li>
                
            </ul>        
        </div>
    ) 
}

export default Sidebar;
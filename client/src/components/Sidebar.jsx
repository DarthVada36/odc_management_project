import React from 'react';

const Sidebar = () => {
    return (
        <div className='bg-black text-white p-4 border-orange w-full md:w-1/4'>
            <div className='text-center text-orange font-bold text-xl mb-4 p-4'>Panel Administrador</div>
            <div className="border-t-2 border-orange"></div>
            <ul className='flex flex-col gap-4 p-10'>
            
                <li className='text-center font-bold hover:text-orange'>Dasboard</li>
                <div className="border-t-2 border-orange mt-4 w-full"></div>
                <li className='text-center font-bold hover:text-orange'>Administradores</li>
                <div className="border-t-2 border-orange mt-4"></div>
                <li className='text-center font-bold hover:text-orange'>Cursos</li>
                <div className="border-t-2 border-orange mt-4"></div>
                <li className='text-center font-bold hover:text-orange p-2'>Inscripciones</li>
                <div className="border-t-2 border-orange"></div>
            </ul>        
        </div>
    ) 
}

export default Sidebar;
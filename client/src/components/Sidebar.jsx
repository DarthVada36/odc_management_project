import React from 'react';

const Sidebar = () => {
    return (
        <div className='bg-black text-white p-4 w-1/4'>
            <ul className='flex flex-col gap-4'>
                <li className='font-bold hover:text-orange'>Dasboard</li>
                <li className='hover:text-orange'>Usuaario</li>
                <li className='hover:text-orange'>Cursos</li>
            </ul>        
        </div>
    ) 
}

export default Sidebar;
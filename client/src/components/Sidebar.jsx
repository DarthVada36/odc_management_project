import React from 'react'

const Sidebar = ({ onMenuSelect, activeComponent }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'administrators', label: 'Administradores' },
        { id: 'enrollments', label: 'Inscripciones' },
        { id: 'courses', label: 'Cursos' }
    ]

    return (
        <div className="flex flex-col w-full min-h-screen bg-black mobile:w-full tablet:w-1/4">
            <div className="px-8 py-6 mb-4 text-2xl text-white font-helvetica-w20-bold">
                Panel Administrador
            </div>
            <div className="border-t border-neutral-600"></div>
            <ul className="flex flex-col">
                {menuItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <li
                            onClick={() => onMenuSelect(item.id)}
                            className={`px-8 py-4 font-helvetica-w20-bold transition-all duration-300 cursor-pointer
                                ${
                                    activeComponent === item.id
                                        ? 'text-primary'
                                        : 'text-white hover:text-primary'
                                }`}
                        >
                            {item.label}
                        </li>
                        <div className="border-t border-neutral-600"></div>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar

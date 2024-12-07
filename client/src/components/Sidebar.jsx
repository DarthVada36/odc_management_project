import React from 'react'

const Sidebar = ({ onMenuSelect, activeComponent }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'administrators', label: 'Administradores' },
        { id: 'enrollments', label: 'Inscripciones' },
    ]

    return (
        <div className="flex flex-col w-full min-h-screen p-4 text-white bg-black border-orange md:w-1/4">
            <div className="p-4 mb-4 text-xl font-bold text-center text-orange">
                Panel Administrador
            </div>
            <div className="border-t-2 border-orange"></div>
            <ul className="flex flex-col gap-4 p-8">
                {menuItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <li
                            onClick={() => onMenuSelect(item.id)}
                            className={`text-center font-bold hover:text-orange transition-colors cursor-pointer
                                ${
                                    activeComponent === item.id
                                        ? 'text-orange'
                                        : 'text-white'
                                }`}
                        >
                            {item.label}
                        </li>
                        <div className="mt-2 border-t-2 border-orange"></div>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar

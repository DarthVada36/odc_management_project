import React from 'react'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ onMenuSelect, activeComponent }) => {
    const { admin } = useAuth()
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'administrators', label: 'Administradores', requiredRole: 1 },
        { id: 'enrollments', label: 'Inscripciones' },
        { id: 'enrollmentsByCourse', label: 'Inscripciones por Curso' },
        { id: 'courses', label: 'Cursos' },
    ]

    const filteredMenuItems = menuItems.filter(
        (item) => !item.requiredRole || admin?.role_id === item.requiredRole
    )

    return (
        <div className="flex flex-col w-full min-h-screen bg-black laptop:w-[28.4rem] mobile:w-full tablet:w-1/4">
            <div className="px-8 py-4 mb-4 text-2xl text-white font-helvetica-w20-bold">
                Panel Administrador
            </div>
            <div className="border-t border-neutral-600"></div>
            <ul className="flex flex-col">
                {filteredMenuItems.map((item) => (
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

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useDashboard } from '../context/DashboardContext'

const Sidebar = () => {
    const { activeComponent, setActiveComponent } = useDashboard()
    const { admin } = useAuth()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', requiredRole: 1 },
        { id: 'administrators', label: 'Administradores', requiredRole: 1 },
        { id: 'enrollments', label: 'Inscripciones', requiredRole: 1 },
        { id: 'courses', label: 'Cursos' },
    ]

    const filteredMenuItems = menuItems.filter((item) => {
        if (admin?.role_id === 2) {
            return item.id === 'courses'
        }
        return !item.requiredRole || admin?.role_id === item.requiredRole
    })

    return (
        <div className="pt-[0.5rem] hidden font-bold font-helvetica-w20-bold laptop:block desktop:w-[11.3rem] min-h-screen bg-black">
            <ul className="flex flex-col">
                {filteredMenuItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <li
                            onClick={() => setActiveComponent(item.id)}
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

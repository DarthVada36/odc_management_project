import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import UserTable from '../components/UserTable'
import AdministratorsTable from '../components/AdministratorsTable'
import CoursesTable from '../components/CoursesTable'  // Importa el componente de la tabla de cursos
import MainPanel from '../components/MainPanel'

const DashboardPage = () => {
const [activeComponent, setActiveComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'administrators':
                return <AdministratorsTable />
            case 'enrollments':
                return <UserTable />
            case 'courses':  // Caso para los cursos
                return <CoursesTable />
            default:
                return <MainPanel title="Dashboard" />
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar
                onMenuSelect={setActiveComponent}
                activeComponent={activeComponent}
            />
            <div className="flex flex-col flex-1 bg-gray-100">
                {renderComponent()}
            </div>
        </div>
    )
}

export default DashboardPage

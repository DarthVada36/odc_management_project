import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import AdministratorsTable from '../components/AdministratorsTable'
import CoursesTable from '../components/CoursesTable'  // Importa el componente de la tabla de cursos
import MainPanel from '../components/MainPanel'
import EnrollmentsTable from '../components/EnrollmentsTable'
import EnrollmentsTableByCourse from '../components/EnrollmentsTableByCourse'


const DashboardPage = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'administrators':
                return <AdministratorsTable />
            case 'enrollments':
                return <EnrollmentsTable />
            case 'courses':
                return (
                    <CoursesTable 
                        onShowEnrollmentsByCourse={(courseId) => {
                            setSelectedCourseId(courseId); // Guarda el ID del curso seleccionado
                            setActiveComponent('enrollmentsByCourse');
                        }}
                    />
                );
            case 'enrollmentsByCourse':
                return <EnrollmentsTableByCourse courseId={selectedCourseId} />
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

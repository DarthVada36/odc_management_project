import Pagination from './Pagination'
import React, { useEffect, useState } from 'react'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import {
    getAllEnrollments,
    deleteEnrollmentById,
} from '../services/enrollmentServices.js'

const UserTable = () => {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const totalPages = Math.ceil(enrollments.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentEnrollments = enrollments.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await getAllEnrollments()
                setEnrollments(data)
                setLoading(false)
            } catch (error) {
                console.error('Error al obtener las inscripciones:', error)
                setError(error)
                setLoading(false)
            }
        }

        fetchEnrollments()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteEnrollmentById(id)
            setEnrollments(
                enrollments.filter((enrollment) => enrollment.id !== id)
            )
        } catch (error) {
            console.error('Error al eliminar la inscripción:', error)
            setError(error)
        }
    }

    const handleExportPDF = () => {
        try {
            // Implementar lógica de exportación a PDF
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id,
            ])
            exportToPDF(
                'Listado de Administradores',
                headers,
                data,
                'administradores.pdf'
            )
        } catch (error) {
            console.error('Error al exportar a PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            // Implementar lógica de exportación a Excel
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id,
            ])
            exportToExcel(
                'Administradores',
                headers,
                data,
                'administradores.xlsx'
            )
        } catch (error) {
            console.error('Error al exportar a Excel:', error)
        }
    }

    if (loading) {
        return <div>Cargando...</div>
    }
    if (error) {
        return <div>Error al cargar las inscripciones</div>
    }

    return (
        <div className="p-2 bg-white shadow-md sm:p-6 md:p-8">
            {/* Botones de exportación */}
            <div className="flex justify-end mb-4 space-x-4">
                <button
                    onClick={handleExportPDF}
                    className="px-4 py-2 text-black border border-black rounded bg-orange"
                >
                    Descargar PDF
                </button>
                <button
                    onClick={handleExportExcel}
                    className="px-4 py-2 text-black border border-black rounded bg-orange"
                >
                    Descargar Excel
                </button>
            </div>

            {/* Botón para crear un nuevo administrador */}
            <button className="w-full px-4 py-2 mb-4 text-black rounded bg-orange button-auto sm:mb-6 md:mb-8">
                Crear nueva inscripción
            </button>

            {/* Contenedor de la tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border table-auto border-orange">
                    <thead className="text-white bg-orange">
                        <tr>
                            <th className="p-2 text-black sm:p-3 md:p-4">
                                Nombre
                            </th>
                            <th className="p-2 text-black sm:p-3 md:p-4">
                                Email
                            </th>
                            <th className="p-2 text-black sm:p-3 md:p-4">
                                Acciones
                            </th>
                            <th className="p-2 text-black sm:p-3 md:p-4">
                                Contacto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEnrollments.map((enrollment, index) => (
                            <tr
                                key={index}
                                className="text-center border-b border-orange"
                            >
                                <td className="p-2 sm:p-3 md:p-4">
                                    <span className="block">
                                        {enrollment.fullname}
                                    </span>
                                </td>
                                <td className="p-2 sm:p-3 md:p-4">
                                    <span className="block text-center">
                                        {enrollment.email}
                                    </span>
                                </td>
                                <td className="p-2 sm:p-3 md:p-4">
                                    <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0">
                                        <button className="flex-grow w-full px-4 py-1 text-black border border-black rounded bg-orange sm:flex-grow-0">
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(enrollment.id)
                                            }
                                            className="flex-grow w-full px-2 py-1 text-black bg-white border border-black rounded sm:flex-grow-0"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                                <td className="flex justify-center p-2 sm:p-3 md:p-4">
                                    <button className="flex items-center w-full px-4 py-1 space-x-2 text-black border border-black rounded bg-orange sm:w-auto">
                                        <img
                                            src={'src/assets/email.png'}
                                            className="w-5 h-5"
                                            alt="Email Icon"
                                        />
                                        <span>Email</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default UserTable

import Pagination from './Pagination'
import React, { useEffect, useState } from 'react'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import MainPanel from './MainPanel.jsx'
import { getAllCourses, deleteCourseById } from '../services/coursesServices.js'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'

const CoursesTable = ({ onShowEnrollmentsByCourse }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredCourses, setFilteredCourses] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentCourses = filteredCourses.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const data = await getAllCourses()
            setCourses(data)
            setFilteredCourses(data) // Inicializamos filteredCourses con todos los cursos
            setLoading(false)
        } catch (error) {
            console.error('Error fetching courses:', error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteCourseById(id)
            const updatedCourses = courses.filter((course) => course.id !== id)
            setCourses(updatedCourses)
            setFilteredCourses(updatedCourses) // Actualizamos también los cursos filtrados
            setCurrentPage(1) // Reseteamos la página después de eliminar
        } catch (error) {
            console.error('Error deleting course:', error)
            setError(error)
        }
    }

    const handleExportPDF = async () => {
        try {
            const headers = [
                'Título',
                'Descripción',
                'Fecha',
                'Schedule',
                'Link',
                'Tickets',
            ]
            const data = filteredCourses.map((course) => [
                course.title,
                course.description,
                course.date,
                course.schedule,
                course.link,
                course.tickets,
            ])
            await exportToPDF('Courses List', headers, data, 'courses.pdf')
        } catch (error) {
            console.error('Error exporting to PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            const headers = [
                'Title',
                'Description',
                'Date',
                'Schedule',
                'Link',
                'Tickets',
            ]
            const data = filteredCourses.map((course) => [
                course.title,
                course.description,
                course.date,
                course.schedule,
                course.link,
                course.tickets,
            ])
            exportToExcel('Courses', headers, data, 'courses.xlsx')
        } catch (error) {
            console.error('Error exporting to Excel:', error)
        }
    }

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredCourses(filtered)
        setCurrentPage(1) // Reseteamos a la primera página cuando se realiza una búsqueda
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los cursos</div>

    return (
        <MainPanel
            title="Gestión de Cursos"
            totalItems={filteredCourses.length}
            onSearch={handleSearch}
        >
            {/* ... (resto del JSX se mantiene igual) */}
            <div className="flex flex-col h-full">
                {/* Actions buttons */}
                <div className="flex flex-col justify-between mb-4 space-y-2 mobile:flex-col tablet:flex-row tablet:space-y-0">
                    <div className="flex items-center justify-start w-full gap-4 tablet:justify-end">
                        <img
                            src={pdfIcon}
                            alt="Exportar a PDF"
                            className="w-8 h-8 transition-opacity duration-300 cursor-pointer opacity-70 hover:opacity-100"
                            onClick={handleExportPDF}
                            title="Exportar a PDF"
                        />
                        <img
                            src={excelIcon}
                            alt="Exportar a Excel"
                            className="w-8 h-8 transition-opacity duration-300 cursor-pointer opacity-70 hover:opacity-100"
                            onClick={handleExportExcel}
                            title="Exportar a Excel"
                        />
                    </div>
                </div>

                {/* Table of Courses */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full mb-4 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-orange">
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Título
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Descripción
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Fecha
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Horario
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Enlace
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Tickets
                                </th>
                                <th className="p-3 text-center font-helvetica-w20-bold">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => (
                                <tr
                                    key={index}
                                    className="transition-colors duration-300 border-b hover:bg-neutral-200"
                                >
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {course.title}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {course.description}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {new Date(
                                            course.date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {course.schedule}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        <a
                                            href={course.link}
                                            className="text-blue-600 underline hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver
                                        </a>
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {course.tickets}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-2">
                                            <button className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white">
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(course.id)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 border-2 border-black bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onShowEnrollmentsByCourse(
                                                        course.id
                                                    )
                                                }
                                                className="px-4 py-2 text-white transition-all duration-300 bg-black border-2 border-black font-helvetica-w20-bold hover:bg-white hover:text-black"
                                            >
                                                Inscritos
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </MainPanel>
    )
}

export default CoursesTable

import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import MainPanel from './MainPanel.jsx'
import CourseForm from './CourseForm'
import ConfirmationModal from './ConfirmationModal'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'

import {
    getAllCourses,
    removeCourseById,
    updateCourseById as updateCourse,
    createCourse,
} from '../services/coursesServices'

const CoursesTable = ({ onShowEnrollmentsByCourse }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredCourses, setFilteredCourses] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentCourses = filteredCourses.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true)
                const data = await getAllCourses()
                setCourses(data)
                setFilteredCourses(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching courses:', error)
                setError(error)
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const handleEdit = (course) => {
        setSelectedCourse(course)
        setIsFormOpen(true)
    }

    const handleDeleteClick = (course) => {
        setSelectedCourse(course)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = async (id) => {
        try {
            await removeCourseById(id)
            const updatedCourses = courses.filter((course) => course.id !== id)
            setCourses(updatedCourses)
            setFilteredCourses(updatedCourses)
            setIsDeleteModalOpen(false)
            setSelectedCourse(null)
            setCurrentPage(1)
        } catch (error) {
            console.error('Error deleting course:', error)
            setError(error)
        }
    }

    const handleSubmit = async (formData) => {
        try {
            let updatedCourse
            if (selectedCourse) {
                updatedCourse = await updateCourse(selectedCourse.id, formData)
                const updatedCourses = courses.map((course) =>
                    course.id === selectedCourse.id ? updatedCourse : course
                )
                setCourses(updatedCourses)
                setFilteredCourses(updatedCourses)
            } else {
                updatedCourse = await createCourse(formData)
                setCourses([...courses, updatedCourse])
                setFilteredCourses([...filteredCourses, updatedCourse])
            }
            setIsFormOpen(false)
            setSelectedCourse(null)
            return true
        } catch (error) {
            console.error('Error saving course:', error)
            setError(error)
            return false
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
        setCurrentPage(1)
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los cursos</div>

    return (
        <MainPanel
            title="Gestión de Cursos"
            totalItems={filteredCourses.length}
            onSearch={handleSearch}
        >
            <div className="flex flex-col h-full">
                {/* Actions buttons */}
                <div className="flex flex-col justify-between mb-4 space-y-2 mobile:flex-col tablet:flex-row tablet:space-y-0">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                    >
                        Crear Nuevo Curso
                    </button>
                    <div className="flex items-center justify-start gap-4 tablet:justify-end">
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
                            {currentCourses.map((course) => (
                                <tr
                                    key={course.id}
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
                                            <button
                                                onClick={() =>
                                                    handleEdit(course)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(course)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
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

            {/* Form Modal */}
            {isFormOpen && (
                <CourseForm
                    initialData={selectedCourse}
                    isEditing={!!selectedCourse}
                    title={
                        selectedCourse ? 'Editar Curso' : 'Crear nuevo Curso'
                    }
                    submitText={
                        selectedCourse ? 'Guardar Cambios' : 'Crear Curso'
                    }
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setIsFormOpen(false)
                        setSelectedCourse(null)
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Eliminar Curso"
                message={`¿Estás seguro de que deseas eliminar el curso "${selectedCourse?.title}"?`}
                onConfirm={() => handleDelete(selectedCourse?.id)}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setSelectedCourse(null)
                }}
            />
        </MainPanel>
    )
}

export default CoursesTable

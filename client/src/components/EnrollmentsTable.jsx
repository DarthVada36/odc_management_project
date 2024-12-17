import React, { useEffect, useState } from 'react'
import MainPanel from './MainPanel'
import Pagination from './Pagination'
import {
    getAllEnrollments,
    deleteEnrollmentById,
} from '../services/enrollmentServices'
import EmailEditorComponent from './EmailEditorComponent.jsx'
import { sendEmail } from '../services/emailService.js'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import { useAuth } from '../context/AuthContext.jsx'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'
import ConfirmationModal from './ConfirmationModal'

const EnrollmentsTable = () => {
    const { authRequest } = useAuth()
    const [enrollments, setEnrollments] = useState([])
    const [filteredEnrollments, setFilteredEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [showEmailEditor, setShowEmailEditor] = useState(false)
    const [selectedRecipients, setSelectedRecipients] = useState(null)
    const [selectedEnrollment, setSelectedEnrollment] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState('')
    const itemsPerPage = 8

    const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentEnrollments = filteredEnrollments.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    const fetchEnrollments = async () => {
        try {
            setLoading(true)
            const data = await getAllEnrollments()
            setEnrollments(data)
            setFilteredEnrollments(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener las inscripciones:', error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEnrollments()
    }, [])

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = enrollments.filter((enrollment) =>
            enrollment.fullname.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredEnrollments(filtered)
        setCurrentPage(1)
    }

    const handleOpenEmailEditor = (recipients, subject) => {
        setSelectedRecipients(recipients)
        setSelectedSubject(subject)
        setShowEmailEditor(true)
    }

    const handleSendEmail = async (html) => {
        const customSubject = prompt(
            'Escribe el asunto del correo:',
            selectedSubject || 'Asunto por defecto'
        )

        if (!customSubject) {
            alert('El asunto no puede estar vacío.')
            return
        }

        try {
            await sendEmail(selectedRecipients, customSubject, html)
            alert('Correo enviado con éxito.')
        } catch (error) {
            alert('Error al enviar el correo. Por favor, inténtalo de nuevo.')
        } finally {
            setShowEmailEditor(false)
        }
    }

    const handleCloseEmailEditor = () => {
        setShowEmailEditor(false)
    }

    const handleExportPDF = async () => {
        try {
            const headers = ['Usuario', 'Email', 'Curso']
            const data = filteredEnrollments.map((enrollment) => [
                enrollment.fullname,
                enrollment.email,
                enrollment.course.title,
            ])
            await exportToPDF(
                'Listado de Inscripciones',
                headers,
                data,
                'inscripciones.pdf'
            )
        } catch (error) {
            console.error('Error al exportar a PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            const headers = ['Usuario', 'Email', 'Curso']
            const data = filteredEnrollments.map((enrollment) => [
                enrollment.fullname,
                enrollment.email,
                enrollment.course.title,
            ])
            exportToExcel('Inscripciones', headers, data, 'inscripciones.xlsx')
        } catch (error) {
            console.error('Error al exportar a Excel:', error)
        }
    }

    const handleDeleteClick = (enrollment) => {
        setSelectedEnrollment(enrollment)
        setIsModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        try {
            if (selectedEnrollment) {
                await authRequest(
                    `http://localhost:3000/api/enrollments/${selectedEnrollment.id}`,
                    { method: 'DELETE' }
                )
                fetchEnrollments() // Recargar lista después de eliminar
                setCurrentPage(1) // Reiniciar paginación
            }
        } catch (error) {
            console.error('Error al eliminar la inscripción:', error)
            alert('Error al eliminar la inscripción.')
        } finally {
            setIsModalOpen(false) // Cerrar modal
            setSelectedEnrollment(null) // Limpiar selección
        }
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar las inscripciones</div>

    return (
        <MainPanel
            title="Gestión de Inscripciones"
            totalItems={filteredEnrollments.length}
            onSearch={handleSearch}
        >
            <div className="flex flex-col gap-4 mb-4 tablet:flex-row tablet:justify-end tablet:items-center">
                {/* Botones de exportación */}
                <div className="flex items-center gap-4">
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

                {/* Botón de Email a todos */}
                <button
                    onClick={() =>
                        handleOpenEmailEditor(
                            enrollments.map((e) => e.email),
                            'Inscripciones Generales'
                        )
                    }
                    className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-black border-2 border-black font-helvetica-w20-bold hover:bg-white hover:text-black group"
                >
                    <img
                        src={'src/assets/email.png'}
                        className="w-5 h-5 mr-2 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                        alt="Email Icon"
                    />
                    <span>Email a todos</span>
                </button>
            </div>

            {/* Tabla de inscripciones */}
            <div className="flex-1 overflow-auto">
                <table className="w-full mb-4 border-collapse">
                    <thead>
                        <tr className="border-b-2 border-orange">
                            <th className="p-3 text-left font-helvetica-w20-bold">
                                Nombre
                            </th>
                            <th className="p-3 text-left font-helvetica-w20-bold">
                                Email
                            </th>
                            <th className="p-3 text-left font-helvetica-w20-bold">
                                Curso
                            </th>
                            <th className="p-3 text-center font-helvetica-w20-bold">
                                Acciones
                            </th>
                            <th className="p-3 text-center font-helvetica-w20-bold">
                                Contacto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEnrollments.map((enrollment, index) => (
                            <tr
                                key={index}
                                className="transition-colors duration-300 border-b hover:bg-neutral-200"
                            >
                                <td className="p-3 text-left font-helvetica-w20-bold">
                                    {enrollment.fullname}
                                </td>
                                <td className="p-3 text-left font-helvetica-w20-bold">
                                    {enrollment.email}
                                </td>
                                <td className="p-3 text-left font-helvetica-w20-bold">
                                    {enrollment.course
                                        ? enrollment.course.title
                                        : 'Sin curso'}
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(enrollment)
                                            }
                                            className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center">
                                        <button
                                            className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-black border-2 border-black font-helvetica-w20-bold hover:bg-white hover:text-black group"
                                            onClick={() =>
                                                handleOpenEmailEditor([
                                                    enrollment.email,
                                                ])
                                            }
                                        >
                                            <img
                                                src={'src/assets/email.png'}
                                                className="w-5 h-5 mr-2 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                                                alt="Email Icon"
                                            />
                                            <span>Email</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEmailEditor && (
                <EmailEditorComponent
                    onClose={handleCloseEmailEditor}
                    recipients={selectedRecipients}
                />
            )}

            {/* Paginación */}
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    message={
        selectedEnrollment
            ? `¿Estás seguro de que quieres eliminar la inscripción de ${selectedEnrollment.fullname}?`
            : ''
    }
    onConfirm={handleConfirmDelete}
/>
        </MainPanel>
    )
}

export default EnrollmentsTable

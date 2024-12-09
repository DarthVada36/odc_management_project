import React, { useEffect, useState } from 'react'
import MainPanel from './MainPanel'
import Pagination from './Pagination'
import { getAllEnrollments, deleteEnrollmentById } from '../services/enrollmentServices'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import { useAuth } from '../context/AuthContext.jsx'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'
import ConfirmationModal from './ConfirmationModal'

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([])
  const [filteredEnrollments, setFilteredEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10

  // const totalPages = Math.ceil(enrollments.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentEnrollments = filteredEnrollments.slice(indexOfFirstItem, indexOfLastItem);

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
  }

  const handleExportPDF = async () => {
    try {
      // Implementar lógica de exportación a PDF
      const headers = ['Usuario', 'Email', 'Curso']
      const data = filteredEnrollments.map((enrollment) => [
        enrollment.fullname,
        enrollment.email,
        enrollment.course.title
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
      // Implementar lógica de exportación a Excel
      const headers = ['Usuario', 'Email', 'Curso']
      const data = filteredEnrollments.map((enrollment) => [
        enrollment.fullname,
        enrollment.email,
        enrollment.course.title
      ])
      exportToExcel(
        'Inscripciones',
        headers,
        data,
        'inscripciones.xlsx'
      )
    } catch (error) {
      console.error('Error al exportar a Excel:', error)
    }
  }

  const { enrollment: currentEnrollment } = useAuth()

  const handleDeleteClick = (enrollment) => {
    setSelectedEnrollment(enrollment);  // Establecer la inscripción seleccionada
    setIsModalOpen(true);  // Abrir el modal
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedEnrollment) {
        await deleteEnrollmentById(selectedEnrollment.id);
        fetchEnrollments();
      }
      setIsModalOpen(false);  // Cerrar el modal después de confirmar
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
      alert('Error al eliminar la inscripción.');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);  // Cerrar el modal si el usuario cancela
  };

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar las inscripciones</div>

  return (
    <MainPanel
      title="Gestión de Inscripciones"
      totalItems={filteredEnrollments.length}
      onSearch={handleSearch}
    >

      <div className="flex flex-col h-[calc(100vh-240px)]">
        {/* Export buttons */}
        <div className="flex justify-end mb-3 space-x-4">
          <img
            src={pdfIcon}
            alt="Exportar a PDF"
            className="w-10 h-10 cursor-pointer hover:opacity-80"
            onClick={handleExportPDF}
            title="Exportar a PDF"
          />
          <img
            src={excelIcon}
            alt="Exportar a Excel"
            className="w-10 h-10 cursor-pointer hover:opacity-80"
            onClick={handleExportExcel}
            title="Exportar a Excel"
          />
        </div>

        {/* Botón para crear un nuevo administrador */}
        {/* <button className="w-full px-4 py-2 mb-4 text-black rounded bg-orange button-auto sm:mb-6 md:mb-8">
          Crear nueva inscripción
        </button> */}

        {/* Contenedor de la tabla */}
        <div className="flex-1 min-h-0">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-primary">
              <tr>
                <th className="w-1/5 p-4 text-left text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Nombre
                </th>
                <th className="w-1/5 p-4 text-left text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Email
                </th>
                <th className="w-1/5 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Curso
                </th>
                <th className="w-1/5 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Acciones
                </th>
                <th className="w-1/5 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Contacto
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEnrollments.map((enrollment, index) => (
                <tr
                  key={index}
                  className="transition-colors border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="w-1/5 p-4 text-left font-helvetica-w20-bold">
                    <span className="block">
                      {enrollment.fullname}
                    </span>
                  </td>
                  <td className="w-1/5 p-4">
                    <span className="block text-center">
                      {enrollment.email}
                    </span>
                  </td>
                  <td className="w-1/5 p-4">
                    <span className="block text-center">
                      {enrollment.course ? enrollment.course.title : 'Sin curso'}
                    </span>
                  </td>
                  <td className="w-1/5 p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleDeleteClick(enrollment)
                        }
                        className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                  <td className="w-1/5 p-4">
                    <div className="flex justify-center">
                      <button
                        className="flex items-center px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white">
                        <img
                          src={'src/assets/email.png'}
                          className="w-5 h-5 mr-2"
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

        {/* Pagination */}
        <div className="h-16">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              filteredEnrollments.length / itemsPerPage
            )}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        title="Confirmación de eliminación"
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        message={`¿Estás seguro de que quieres eliminar la inscripción de ${selectedEnrollment ? selectedEnrollment.fullname : ''}?`}
        onConfirm={handleConfirmDelete}
      />

    </MainPanel>
  )
}

export default EnrollmentsTable

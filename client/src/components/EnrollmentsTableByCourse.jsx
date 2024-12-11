import React, { useEffect, useState } from 'react';
import MainPanel from './MainPanel';
import Pagination from './Pagination';
import { getEnrollmentById, deleteEnrollmentById, getAllEnrollmentsByCourseId } from '../services/enrollmentServices';
import { getCourseById } from '../services/coursesServices';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import pdfIcon from '../assets/icons/file-pdf.svg';
import excelIcon from '../assets/icons/file-excel.svg';
import ConfirmationModal from './ConfirmationModal';
import EnrollmentForm from './EnrollmentForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const EnrollmentsTableByCourse = ({ courseId }) => {

  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [courseName, setCourseName] = useState(''); // Nuevo estado para el nombre del curso
  const { authRequest } = useAuth();
  const navigate = useNavigate();
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEnrollments = filteredEnrollments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await getAllEnrollmentsByCourseId(courseId);
      setEnrollments(data);
      setFilteredEnrollments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las inscripciones:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchCourseName = async () => {
    try {
      const course = await getCourseById(courseId);
      setCourseName(course.title);
    } catch (error) {
      console.error('Error al obtener el nombre del curso:', error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
    fetchCourseName();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase()
    const filtered = enrollments.filter((enrollment) =>
      enrollment.fullname.toLowerCase().includes(lowerCaseSearch)
    )
    setFilteredEnrollments(filtered)
  }

  const handleRegisterClick = () => {
    navigate(`/inscription/${courseId}`);
  }

  const handleExportPDF = async () => {
    try {
      // Implementar lógica de exportación a PDF
      const headers = ['Usuario', 'Email', 'Menores']
      const data = filteredEnrollments.map((enrollment) => [
        enrollment.fullname,
        enrollment.email,
        enrollment.minors
          .map((minor) => `${minor.name} (${minor.age} años)`)
          .join(', '),
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
      const headers = ['Usuario', 'Email', 'Menores']
      const data = filteredEnrollments.map((enrollment) => [
        enrollment.fullname,
        enrollment.email,
        enrollment.minors
          .map((minor) => `${minor.name} (${minor.age} años)`)
          .join(', '),
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

  const handleDeleteClick = (enrollment) => {
    setSelectedEnrollment(enrollment)
    setModalMessage(
      `¿Estás seguro de que deseas eliminar al inscrito ${enrollment.fullname}?`
    )
    setIsModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsModalOpen(false)
    try {
      await deleteEnrollmentById(selectedEnrollment.id)
      fetchEnrollments()
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert('Error al eliminar el inscrito')
    }
  }

  const handleEditClick = async (enrollment) => {
    try {
      const response = await authRequest(
        `http://localhost:3000/api/enrollments/${enrollment.id}/with-minors`
      )
      const enrollmentData = await response.json()
      setSelectedEnrollment(enrollmentData)
      setIsEditing(true)
      setShowModal(true)
    } catch (error) {
      console.error(
        'Error al obtener los datos del inscrito:',
        error
      )
      alert('Error al cargar los datos del inscrito')
    }
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las inscripciones</div>;

  return (
    <MainPanel
      title={`Gestion de inscripciones del curso ${courseName}`}
      totalItems={filteredEnrollments.length}
      onSearch={handleSearch}
    >
      <div> </div>
      {/* Export buttons */}
      <div className="flex flex-col h-[calc(100vh-240px)]">
        <div className="flex justify-between mb-3 space-x-4">
          <button
            onClick={handleRegisterClick}
            className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
          >
            Registrar nueva inscripción
          </button>
          <div className="flex gap-4">
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
        </div>

        <div className="flex-1 min-h-0">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-primary">
              <tr>
                <th className="w-2/7 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">Nombre Completo</th>
                <th className="w-2/7 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">Email</th>
                <th className="w-1/7 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">Menores</th>
                <th className="w-1/7 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Acciones
                </th>
                <th className="w-1/7 p-4 text-black border-b-2 font-helvetica-w20-bold border-primary">
                  Contacto
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEnrollments.map((enrollment, index) => (
                <tr
                  key={index}
                  className="transition-colors border-b border-gray-200 hover:bg-gray-50">
                  <td className="w-2/7 p-4 text-left font-helvetica-w20-bold">{enrollment.fullname}</td>
                  <td className="w-2/7 p-4 text-left font-helvetica-w20-bold">{enrollment.email}</td>
                  <td className="w-1/7 p-4 text-left font-helvetica-w20-bold">
                    {enrollment.minors.length > 0 ? (
                      enrollment.minors.map((minor, idx) => (
                        <div key={idx}>
                          {minor.name} ({minor.age} años)
                        </div>
                      ))
                    ) : (
                      <span>Sin menores registrados</span>
                    )}
                  </td>
                  <td className="w-1/5 p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleEditClick(enrollment)
                        }
                        className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                      >
                        Editar
                      </button>
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
                  <td className="w-1/7 p-4 text-left font-helvetica-w20-bold">
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

        <div className="h-16">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredEnrollments.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ConfirmationModal
        title="Confirmar eliminación"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        onConfirm={handleDeleteConfirm}
      />

      {showModal && (
        <EnrollmentForm
          initialData={selectedEnrollment}
          isEditing={isEditing}
          onSubmit={async (formData) => {
            try {
              if (isEditing) {
                await authRequest(
                  `http://localhost:3000/api/enrollments/${selectedEnrollment.id}`,
                  {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                  }
                )
              } else {
                await authRequest(
                  'http://localhost:3000/api/enrollments',
                  {
                    method: 'POST',
                    body: JSON.stringify(formData),
                  }
                )
              }
              await fetchEnrollments()
              setShowModal(false)
              return true
            } catch (error) {
              console.error('Error:', error)
              alert(error.message)
              return false
            }
          }}
          onCancel={() => {
            setShowModal(false)
            setSelectedAdmin(null)
            setIsEditing(false)
          }}
          title={
            isEditing
              ? 'Editar Administrador'
              : 'Crear nuevo Administrador'
          }
          submitText={isEditing ? 'Guardar cambios' : 'Crear'}
        />
      )}

    </MainPanel>
  )
}

export default EnrollmentsTableByCourse;
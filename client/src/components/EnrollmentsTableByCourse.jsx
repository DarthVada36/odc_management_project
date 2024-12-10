import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { getAllEnrollments, deleteEnrollmentById } from '../services/enrollmentServices';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../context/AuthContext';
import pdfIcon from '../assets/icons/file-pdf.svg';
import excelIcon from '../assets/icons/file-excel.svg';

const EnrollmentsTableByCourse = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(''); // Nuevo estado para el curso seleccionado
  const itemsPerPage = 4;

  const currentEnrollments = filteredEnrollments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const data = await getAllEnrollments();
        setEnrollments(data);
        setFilteredEnrollments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const uniqueCourses = Array.from(
    new Set(enrollments.map((enrollment) => enrollment.course.title))
  );

  const handleCourseChange = (event) => {
    const selectedCourseTitle = event.target.value;
    setSelectedCourse(selectedCourseTitle);
    if (selectedCourseTitle === '') {
      setFilteredEnrollments(enrollments);
    } else {
      const filtered = enrollments.filter(
        (enrollment) => enrollment.course.title === selectedCourseTitle
      );
      setFilteredEnrollments(filtered);
    }
  };

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

  const { enrollment: currentEnrollment } = useAuth()






  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las inscripciones</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Gestión de Inscripciones por Cursos</h1>
        <div className="mt-2 mb-3 border-t-2 border-orange"></div>{' '}
        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center space-x-4 md:w-full">
            <label htmlFor="course-select" className="font-medium">
              Selecciona un curso:
            </label>
            <select
              id="course-select"
              value={selectedCourse}
              onChange={handleCourseChange}
              className="px-4 py-2 border rounded"
            >
              <option value="">Todos los cursos</option>
              {uniqueCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      {/* Export buttons */}
      <div className="flex justify-end mb-3 space-x-4 px-8">
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

      <div className="flex flex-col h-[calc(100vh-240px)] px-8">
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
                        alert(
                          'Función de editar pendiente'
                        )
                      }
                      className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(admin)
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

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEnrollments.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      <ConfirmationModal
        title="Confirmar eliminación"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // Confirmar eliminación aquí
        }}
      />
    </div>
  );
};

export default EnrollmentsTableByCourse;
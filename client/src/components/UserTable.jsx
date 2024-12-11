import Pagination from './Pagination';
import React, { useEffect, useState } from 'react';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { getAllEnrollments, deleteEnrollmentById } from '../services/enrollmentServices.js';
import TemplateManager from './TemplateManager';

const UserTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(enrollments.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnrollments = enrollments.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await getAllEnrollments();
        setEnrollments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEnrollmentById(id);
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
      setError(error);
    }
  };

  const handleExportPDF = () => {
    const headers = ['Nombre', 'Email'];
    const data = enrollments.map((enrollment) => [enrollment.fullname, enrollment.email]);

    exportToPDF('Listado de Inscripciones', headers, data, 'inscripciones.pdf');
  };

  const handleExportExcel = () => {
    const headers = ['Nombre', 'Email'];
    const data = enrollments.map((enrollment) => [enrollment.fullname, enrollment.email]);

    exportToExcel('Inscripciones', headers, data, 'inscripciones.xlsx');
  };

  const handleOpenTemplateManager = (recipients) => {
    setSelectedRecipients(recipients);
    setShowTemplateManager(true);
  };

  const handleCloseTemplateManager = () => {
    setShowTemplateManager(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error al cargar las inscripciones</div>;
  }

  return (
    <div className="bg-white shadow-md p-2 sm:p-6 md:p-8">
      {/* Botones de exportación */}
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={handleExportPDF}
          className="bg-orange text-black px-4 py-2 rounded border border-black"
        >
          Descargar PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-orange text-black px-4 py-2 rounded border border-black"
        >
          Descargar Excel
        </button>
        <button
          onClick={() => handleOpenTemplateManager(enrollments.map((e) => e.email))}
          className="bg-orange text-black px-4 py-2 rounded border border-black flex items-center"
        >
          <img
            src={'src/assets/email.png'}
            className="w-5 h-5 mr-2"
            alt="Email Icon"
          />
          <span>Email a todos</span>
        </button>
      </div>

      {/* Contenedor de la tabla */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-orange">
          <thead className="bg-orange text-white">
            <tr>
              <th className="text-black p-2 sm:p-3 md:p-4">Nombre</th>
              <th className="text-black p-2 sm:p-3 md:p-4">Email</th>
              <th className="text-black p-2 sm:p-3 md:p-4">Acciones</th>
              <th className="text-black p-2 sm:p-3 md:p-4">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {currentEnrollments.map((enrollment, index) => (
              <tr key={index} className="text-center border-b border-orange">
                <td className="p-2 sm:p-3 md:p-4">
                  <span className="block">{enrollment.fullname}</span>
                </td>
                <td className="p-2 sm:p-3 md:p-4">
                  <span className="block text-center">{enrollment.email}</span>
                </td>
                <td className="p-2 sm:p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 items-center space-y-2 sm:space-y-0">
                    <button className="bg-orange text-black px-4 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(enrollment.id)}
                      className="bg-white text-black px-2 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
                <td className="p-2 sm:p-3 md:p-4 flex justify-center">
                  <button
                    onClick={() => handleOpenTemplateManager([enrollment.email])}
                    className="bg-orange text-black px-4 py-1 rounded border border-black w-full sm:w-auto flex items-center space-x-2"
                  >
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

      {/* Gestor de plantillas y editor */}
      {showTemplateManager && (
        <TemplateManager
          recipients={selectedRecipients}
          onClose={handleCloseTemplateManager}
        />
      )}
    </div>
  );
};

export default UserTable;

import Pagination from "./Pagination";
import React, { useEffect, useState } from 'react';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { getAllEnrollments, deleteEnrollmentById } from '../services/enrollmentServices.js';

const UserTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = ['Nombre', 'Email']; // Encabezados de la tabla

  //Función paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;  // Número de elementos por página
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
        console.error('Error al obtener los usuarios:', error);
        setError(error);
        setLoading(false);
      };
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Llamar al servicio de eliminación
      await deleteEnrollmentById(id);
      // Actualizar el estado para eliminar el registro de la tabla
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
      setError(error);
    }
  };

  const data = enrollments.map((enrollment) => [
    enrollment.fullname,
    enrollment.email
  ]);

  const handleExportPDF = () => {
    exportToPDF('Listado de Usuarios', headers, data, 'usuarios.pdf');
  };

  const handleExportExcel = () => {
    exportToExcel('Usuarios', headers, data, 'usuarios.xlsx');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error al cargar los usuarios</div>;
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
      </div>

      {/* Botón para crear un nuevo administrador */}
      <button className="bg-orange text-black button-auto w-full px-4 py-2 rounded mb-4 sm:mb-6 md:mb-8">
        Crear nueva inscripción
      </button>
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
          {/* Cuerpo de la tabla */}
          <tbody>
            {/* REnderiza los usuarios*/}
            {currentEnrollments.map((enrollment, index) => (
              <tr
                key={index} className="text-center border-b border-orange">
                {/* Nombre */}
                <td className="p-2 sm:p-3 md:p-4">
                  <span className="block">{enrollment.fullname}</span>
                </td>
                <td className="p-2 sm:p-3 md:p-4">
                  <span className="block text-center">{enrollment.email}</span>
                </td>
                {/* Acciones */}
                <td className="p-2 sm:p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 items-center space-y-2 sm:space-y-0">
                    <button className="bg-orange text-black px-4 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(enrollment.id)}
                      className="bg-white text-black px-2 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0">
                      Eliminar
                    </button>
                  </div>
                </td>
                {/* Contacto */}
                <td className="p-2 sm:p-3 md:p-4 flex justify-center">
                  <button className="bg-orange text-black px-4 py-1 rounded border border-black w-full sm:w-auto flex items-center space-x-2">
                    <img src={'src/assets/email.png'} className="w-5 h-5" alt="Email Icon" />
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

export default UserTable;

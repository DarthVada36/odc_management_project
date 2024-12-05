import React, { useEffect, useState } from 'react';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { getAllEnrollments, deleteEnrollmentById } from '../services/enrollmentServices.js';

const UserTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = ['Nombre', 'Email']; // Encabezados de la tabla

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
    <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
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
            {enrollments.map((enrollment, index) => (
              <tr key={index} className="text-center border-b border-orange">
                <td className="p-2 sm:p-3 md:p-4">{enrollment.fullname}</td>
                <td className="p-2 sm:p-3 md:p-4">{enrollment.email}</td>
                <td className="p-2 sm:p-3 md:p-4">
                  <div className="flex space-x-4">
                    <button className="bg-white text-black px-4 py-2 rounded border border-black">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(enrollment.id)}
                      className="bg-orange text-black px-4 py-2 rounded border border-black">
                      Eliminar
                    </button>
                  </div>
                </td>
                <td className="p-2 sm:p-3 md:p-4">
                  <button className="bg-orange text-black px-4 py-2 rounded border border-black">
                    Contactar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

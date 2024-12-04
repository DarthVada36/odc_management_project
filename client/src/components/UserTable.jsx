import React from 'react';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

const UserTable = ({ users }) => {
  const headers = ['Nombre', 'Email', 'Rol']; // Encabezados de la tabla
  const data = users.map((user) => [user.name, user.email, user.role]); // Filas de datos

  const handleExportPDF = () => {
    exportToPDF('Listado de Usuarios', headers, data, 'usuarios.pdf');
  };

  const handleExportExcel = () => {
    exportToExcel('Usuarios', headers, data, 'usuarios.xlsx');
  };

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
              <th className="text-black p-2 sm:p-3 md:p-4">Rol</th>
              <th className="text-black p-2 sm:p-3 md:p-4">Acciones</th>
              <th className="text-black p-2 sm:p-3 md:p-4">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center border-b border-orange">
                <td className="p-2 sm:p-3 md:p-4">{user.name}</td>
                <td className="p-2 sm:p-3 md:p-4">{user.email}</td>
                <td className="p-2 sm:p-3 md:p-4">{user.role}</td>
                <td className="p-2 sm:p-3 md:p-4">
                  <button className="bg-orange text-black px-4 py-2 rounded border border-black">
                    Editar
                  </button>
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

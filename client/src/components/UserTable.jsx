import Pagination from "./Pagination";
import React, { useState } from 'react';

const UserTable = ({users}) => {
  //Función paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;  // Número de elementos por página
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
      
      
    return (
        <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
           {/* Botón para crear un nuevo administrador */}
            <button className="bg-orange text-black button-auto w-full px-4 py-2 rounded mb-4 sm:mb-6 md:mb-8">
                Crear nuevo administrador
            </button>
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
                {/* Cuerpo de la tabla */}
                <tbody>
                {/* REnderiza los usuarios*/}
                {users.map((user, index) => (
            <tr 
            key={index} className="text-center border-b border-orange">
              {/* Nombre */}
              <td className="p-2 sm:p-3 md:p-4">
              <span className="block">{user.name}</span>
              </td>
              <td className="p-2 sm:p-3 md:p-4">
              <span className="block text-center">{user.email}</span>
                </td>
              {/* Rol */}
              <td className="px-4 py-2  text-center sm:p-3 md:p-4">
              <span className="block text-center">{user.role}</span>
              </td>
              {/* Acciones */}
              <td className="p-2 sm:p-3 md:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 items-center space-y-2 sm:space-y-0">
                <button className="bg-orange text-black px-4 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0">
                  Editar
                </button>
                <button className="bg-white text-black px-2 py-1 rounded border border-black flex-grow w-full sm:flex-grow-0">
                  Eliminar
                </button>
                </div>
                </td>
              {/* Contacto */}
              <td className="p-2 sm:p-3 md:p-4">
                <button className="bg-orange text-black px-4 py-1 rounded border border-black w-full sm:w-auto">
                  Email
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
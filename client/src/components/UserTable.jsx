import React from "react";

const UserTable = () => {
        //Datos simulados
        const users = [
            {id: 1, name: 'Alice', email: 'alice@example.com'},
            {id: 2, name: 'Jhon', email: 'jkhon@example.com'}
        ];
   
    return (
        <div className="bg-white shadow-md p-4">
            <button className="bg-orange text-white px-4 py-2 rounded mb-4">
                Crear nuevo usuario
            </button>
            <table className="table-auto w-full border border-gray-300">
                <thead className="bg-orange text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Acciones</th>
                    </tr>                                           
                </thead>
                <tbody>
                {users.map((user, index) => (
            <tr key={index} className="text-center border-b border-gray-300">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button className="bg-orange text-white px-2 py-1 rounded mr-2">
                  Editar
                </button>
                <button className="bg-black text-white px-2 py-1 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
            </table>
        </div>
    )
}

export default UserTable;
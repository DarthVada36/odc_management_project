import React from "react";
import UserTable from './UserTable';


const AdminPanel = () => {
    
    return (
        <div className="flex-1 bg-white p-3">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-orange text-2xl font-bold p-3">Gestión de usuarios</h1>
        {/* Linea naranja */}
        <div className="border-t-2 border-orange "></div>
        <p className="text-black text-center p-4">Total de usuarios Añadir buscador: 10</p>
      </div>
      {/* Tabla */}
      <UserTable />
    </div>
  );
};

export default AdminPanel;

import React from "react";
import UserTable from './UserTable';


const AdminPanel = () => {
    
    return (
        <div className="flex-1 bg-white p-6">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-orange-500 text-2xl font-bold">Gestión de usuarios</h1>
        <p className="text-gray-600">Total de usuarios: 10</p>
      </div>
      {/* Tabla */}
      <UserTable />
    </div>
  );
};

export default AdminPanel;

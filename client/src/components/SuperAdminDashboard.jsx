import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/access-admin');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-orange-500">Panel de Super Administrador</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2>Bienvenido al Panel de Super Administrador</h2>
          <button
            onClick={() => navigate('/new-admin')}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Crear Nuevo Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
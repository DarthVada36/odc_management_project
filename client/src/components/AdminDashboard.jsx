import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/access-admin');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-orange-500">Panel de Administrador</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2>Bienvenido al Panel de Administrador</h2>
          {/* Aquí va el contenido del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
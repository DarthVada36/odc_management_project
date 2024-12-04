import React from 'react'
import AdminPanel from '../components/AdminPanel';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Barra lateral */}
      <Sidebar className="w-full md:w-1/4 bg-gray-200" />
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-gray-100 p-4">
        {/* Panel de Administración */}
        <AdminPanel />
      </div>
    </div>
  );
};
export default DashboardPage;

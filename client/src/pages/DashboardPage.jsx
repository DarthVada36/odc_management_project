import React from 'react';
import AdminPanel from '../components/AdminPanel.jsx';
import Sidebar from '../components/Sidebar.jsx';

const DashboardPage = () => {
  return (
    <div className='flex h-screen'>
      {/* Barra lateral */}
      <Sidebar className='w-1/4 bg-gray-200' />

      {/* Contenido principal */}
      <div className='flex-1 flex flex-col bg-gray-100'>
        {/* Panel de Administración */}
        <AdminPanel />
      </div>
    </div>
  );
};
export default DashboardPage;
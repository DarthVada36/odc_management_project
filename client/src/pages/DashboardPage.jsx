import React from 'react';
import AdminPanel from '../components/AdminPanel';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col md:flex-row h-screen">
      {/* Barra lateral */}
      <Sidebar className="w-full md:w-1/4 bg-gray-200" />
      
=======
    <div className='flex h-screen'>
      {/* Barra lateral */}
      <Sidebar className='w-1/4 bg-gray-200' />

>>>>>>> c28934d59bd0d95f333d815da077b8eaebf0eab7
      {/* Contenido principal */}
      <div className='flex-1 flex flex-col bg-gray-100 p-4'>
        {/* Panel de Administración */}
        <AdminPanel />
      </div>
    </div>
  );
};
export default DashboardPage;

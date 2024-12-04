// src/routes/routes.jsx
import React from 'react';
import Layout from '../layout/Layout';
import FormPage from '../pages/FormPage';
import AccessAdminPage from '../pages/AccessAdminPage';  // Asegúrate de importar la nueva página
import { createBrowserRouter } from 'react-router-dom';
import CreateAdminPage from '../pages/CreateAdminPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/inscription',
        element: <FormPage />,
      },
      {
        path: '/access-admin', 
        element: <AccessAdminPage />, 
      },
      {
        path: '/new-admin',  
        element: <CreateAdminPage />,  
      },
    ],
  },
]);

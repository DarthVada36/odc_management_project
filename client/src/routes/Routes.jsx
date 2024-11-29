// src/routes/routes.jsx
import React from 'react';
import Layout from '../layout/Layout';
import FormPage from '../pages/FormPage';
import AccessAdminPage from '../pages/AccessAdminPage';  // Asegúrate de importar la nueva página
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <FormPage />,
      },
      {
        path: '/access-admin',  // Ruta para la página de acceso de administradores
        element: <AccessAdminPage />,  // El componente de la página de acceso
      },
    ],
  },
]);

// src/routes/routes.jsx
import React from 'react';
import Layout from '../layout/Layout';
import FormPage from '../pages/FormPage';
import AccessAdminPage from '../pages/AccessAdminPage';
import CreateAdminPage from '../pages/CreateAdminPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import SuperAdminDashboardPage from '../pages/SuperAdminDashboardPage';
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
        path: '/access-admin', 
        element: <AccessAdminPage />, 
      },
      {
        path: '/new-admin',  
        element: <CreateAdminPage />,  
      },
      {
        path: '/admin-dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: '/super-admin-dashboard',
        element: <SuperAdminDashboardPage />,
      },
    ],
  },
]);
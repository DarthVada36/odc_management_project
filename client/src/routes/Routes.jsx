// src/routes/routes.jsx
import React from 'react';
import Layout from '../layout/Layout';
import FormPage from '../pages/FormPage';
import AccessAdminPage from '../pages/AccessAdminPage';
import { createBrowserRouter } from 'react-router-dom';
import CreateAdminPage from '../pages/CreateAdminPage';
import DashboardPage from '../pages/DashboardPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';
import CoursesPage from '../pages/CoursesPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'inscription/:id',
        element: (
          <PublicRoute>
            <FormPage />
          </PublicRoute>
        ),
      },
      {
        path: 'courses',
        element: (
          <PublicRoute>
            <CoursesPage />
          </PublicRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'access-admin',
        element: <AccessAdminPage />,
      },
      {
        path: 'new-admin',
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <CreateAdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

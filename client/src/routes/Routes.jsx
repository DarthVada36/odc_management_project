// src/routes/routes.jsx
import React from 'react'
import Layout from '../layout/Layout'
import FormPage from '../pages/FormPage'
import AccessAdminPage from '../pages/AccessAdminPage' // Asegúrate de importar la nueva página
import { createBrowserRouter } from 'react-router-dom'
import CreateAdminPage from '../pages/CreateAdminPage'
import DashboardPage from '../pages/DashboardPage'
import { ProtectedRoute } from '../components/ProtectedRoute'
import FakePage from '../pages/FakePage'

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
            {
                path: 'fake-Page',
                element: <FakePage />
            },
        ],
    },
])

export default router

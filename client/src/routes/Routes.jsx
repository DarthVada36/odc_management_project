// src/routes/routes.jsx
import React from 'react'
import Layout from '../layout/Layout'
import FormPage from '../pages/FormPage'
import AccessAdminPage from '../pages/AccessAdminPage'
import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { PublicRoute } from '../components/PublicRoute'
import CoursesPage from '../pages/CoursesPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CoursesPage />,
            },
            {
                path: 'inscription/:id',
                element: (
                    <PublicRoute>
                        <FormPage />
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
        ],
    },
])

export default router

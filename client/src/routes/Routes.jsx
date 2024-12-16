import React from 'react'
import Layout from '../layout/Layout'
import FormPage from '../pages/FormPage'
import AccessAdminPage from '../pages/AccessAdminPage'
import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import { ProtectedRoute } from '../components/ProtectedRoute'
import CoursesPage from '../pages/CoursesPage'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PublicRoute } from '../components/PublicRoute' 

const AccessAdminWrapper = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <AccessAdminPage />
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <PublicRoute>
                        <CoursesPage />
                    </PublicRoute>
                )
            },
            {
                path: 'courses',
                element: (
                    <PublicRoute>
                        <CoursesPage />
                    </PublicRoute>
                )
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
                element: <AccessAdminWrapper />,
            },
        ],
    },
])

export default router

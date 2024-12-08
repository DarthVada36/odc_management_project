// src/components/ProtectedRoute.jsximport React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// component for protected routes
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, admin, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/access-admin" replace />
    }

    if (allowedRoles.length > 0) {
        // Validate if the user's role is allowed for the route
        if (!allowedRoles.includes(admin?.role_id)) {
            console.warn(
                `Acceso denegado: el rol del usuario (${admin?.role_id}) no está permitido para esta ruta.`
            )
            return <Navigate to="/dashboard" replace />
        }
    }

    return children
}

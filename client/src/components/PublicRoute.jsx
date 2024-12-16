import { Navigate, useLocation, matchPath } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Define las rutas públicas permitidas, incluyendo rutas dinámicas
    const publicRoutes = ['/inscription/:id', '/courses'];

    // Verifica si la ruta actual es una ruta pública
    const isPublicRoute = publicRoutes.some((route) => matchPath(route, location.pathname));

    // Permitir acceso si la ruta actual es pública
    if (isPublicRoute) {
        return children;
    }

    // Si no está autenticado y no es una ruta pública, redirigir a login
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

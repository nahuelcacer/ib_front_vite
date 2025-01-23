import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../service/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { username, role } = authService.getUser()

    if (!username) {
        return <Navigate to="/login" replace />; // Redirige si no está autenticado
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />; // Redirige si no tiene permisos
    }
    
    return children;
};

export default ProtectedRoute;

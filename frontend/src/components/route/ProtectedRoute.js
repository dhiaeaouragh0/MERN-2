import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
 
    // Si l'utilisateur doit être admin et ne l'est pas, rediriger vers la page de login
    if (isAdmin && user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    // Si l'utilisateur est authentifié (et admin si nécessaire), retourner les enfants
    return children;
};

export default ProtectedRoute;

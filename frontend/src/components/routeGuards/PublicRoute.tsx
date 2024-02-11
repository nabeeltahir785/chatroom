import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/users'; 

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    return children;
};

export default PublicRoute;
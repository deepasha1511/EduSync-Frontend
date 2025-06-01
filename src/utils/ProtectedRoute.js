import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roleRequired }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
        return <Navigate to="/login" />;
    }

    if (role !== roleRequired) {
        return <Navigate to={`/${role.toLowerCase()}/dashboard`} />;
    }

    return children;
}

export default ProtectedRoute;
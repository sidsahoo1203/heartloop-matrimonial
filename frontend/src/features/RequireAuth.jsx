import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    // Parse cookies to find the token named "token"
    const tokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

    // Extract the token value if the cookie exists
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default RequireAuth;
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';


const Authenticator = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

    useEffect(() => {
        validateToken().catch(() => setIsUserAuthenticated(false));
    }, []);

 
    const refreshToken = async () => {
    
        const refresh_token = localStorage.getItem('refresh');
        try {
        
            const res = await api.post("/api/token/refresh/", {
                refresh: refresh_token,
            });
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access);
                setIsUserAuthenticated(true);
            } else {
               
                setIsUserAuthenticated(false);
            }
        } catch (error) {
            console.error(error);
            setIsUserAuthenticated(false);
        }
    };


    const validateToken = async () => {

        const access_token = localStorage.getItem('access');

        if (!access_token) {
            setIsUserAuthenticated(false);
            return;
        }

        const jwt = jwtDecode(access_token);
        const expiration = jwt.exp;
        const currentTime = Date.now() / 1000; // Divide by 1000 to get time in seconds

        if (expiration < currentTime) {
            await refreshToken();
        } else {
            setIsUserAuthenticated(true);
        }
    };

    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If user is authenticated, render the children components 
    // If user is not authenticated, navigate to login page
    return isUserAuthenticated ? children : <Navigate to='/login' />;
};

export default Authenticator; 
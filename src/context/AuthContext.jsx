import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { axiosInstance, GET_ROUTES, PATH_URL, POST_ROUTES } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') || false);

    const guestId = localStorage.getItem('guestId') || null;


    const logInAction = async (email, password) => {
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.SIGN_IN}`, { email, password, guestId })
            if (response.data.success) {
                localStorage.clear();
                setIsAuthenticated(true)
                localStorage.setItem('token', JSON.stringify(true));
                navigate(PATH_URL.ACCOUNT.BASE);
            };

        } catch (error) {
            showToast(error.response?.data?.error || "Sign in failed", 'error');
        };
    };

    const logOutAction = async () => {
        try {
            const response = await axiosInstance.get(`${GET_ROUTES.LOGOUT}`);
            if (response.data.success) {
                localStorage.clear();
                setIsAuthenticated(false);
                setUser(null);
                showToast('Log Out Successfully', 'success')
                navigate(PATH_URL.SIGN_IN);
            };
        } catch (error) {
            showToast(error.response?.data?.error || "Log out failed", 'error')
        }

    };


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get(`${GET_ROUTES.GET_USER_PROFILE}`);
                if (response.data.authenticated) {
                    setUser(response.data.user)
                    setIsAuthenticated(response.data.authenticated)
                } else {
                    localStorage.clear();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                localStorage.clear();
                setIsAuthenticated(false);
                setUser(null);
            };
        };
        if (isAuthenticated) {
            fetchUserProfile();
        }
        ;

    }, [isAuthenticated]);







    return (
        <AuthContext.Provider value={{ logInAction, isAuthenticated, user, logOutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};







import React, { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { axiosInstance, GET_ROUTES, PATH_URL, POST_ROUTES } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';


const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const {showToast} = useToast();
    const navigate = useNavigate();

    const guestId = localStorage.getItem('guestId') || null;


    const logInAction =async(email,password)=>{
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.SIGN_IN}`,{email,password,guestId})
            if(response.data.success){
                setToken(response.data.token)
                sessionStorage.setItem('token',JSON.stringify(response.data.token))
                showToast('Login Successfully', 'success');
                localStorage.clear();
                navigate(PATH_URL.ACCOUNT.BASE);
            };
            
        } catch (error) {
            showToast(error.response?.data?.error || "Sign in failed", 'error');
        };
    };

    const logOutAction = useCallback( async()=>{
        const response = await axiosInstance.get(`${GET_ROUTES.LOGOUT}`);
        try {
            if(response.data.success){
                setToken(null);
                setUser(null)
                sessionStorage.clear();
                showToast('Log Out Successfully', 'success')
                navigate(PATH_URL.SIGN_IN);
            };
        } catch (error) {
            showToast(error.response?.data?.error  || "Log out failed", 'error')
        }
       
    },[]);


    useEffect(()=>{
        console.log("getting user Data");
        
        const fetchUserProfile =async()=>{
            console.log("Inside Fetch user profile");
            try {
                
                const response = await axiosInstance.get(`${GET_ROUTES.GET_USER_PROFILE}`);
                
                if(response.data.success){
                    setUser(response.data.user)
                };
            } catch (error) {
                console.log(error.response);
                
                if(error.response?.status === 500 || error.response?.status === 401){
                    showToast('Session has expired. Please log in again.')
                    await logOutAction();
                };
            };
        };

        if(token){
            fetchUserProfile();
        };
      
    },[token,showToast,logOutAction]);

 
    

    return (
        <AuthContext.Provider value={{logInAction ,token, user,logOutAction}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = ()=>{
    return useContext(AuthContext);
};







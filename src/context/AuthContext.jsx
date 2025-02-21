import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { axiosInstance, GET_ROUTES, PATH_URL, POST_ROUTES } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';


const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [token, setToken] = useState(sessionStorage.getItem('token') ||'');
    const [user, setUser] = useState('');
    const {showToast} = useToast();
    const navigate = useNavigate();

    const guestId = localStorage.getItem('guestId') || null;

    
    
    useEffect(()=>{
        if(token){
            const fetchUserProfile =async()=>{
                const response = await axiosInstance.get(`${GET_ROUTES.GET_USER_PROFILE}`);
                if(response.data.success){
                    setUser(response.data.user)
                };
            };
            fetchUserProfile();
        };
    },[token,setUser]);

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
            showToast(error.response.data.error, 'error')
            console.log(error);
        };
    };

    const logOutAction = async()=>{
        const response = await axiosInstance.get(`${GET_ROUTES.LOGOUT}`);
        try {
            if(response.data.success){
                setToken('');
                setUser('')
                sessionStorage.clear();
                showToast('Log Out Successfully', 'success')
                navigate(PATH_URL.SIGN_IN);
            };
        } catch (error) {
            showToast(error.response.data.error, 'error')
        }
       
    };

 
    

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







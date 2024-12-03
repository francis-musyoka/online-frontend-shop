import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { axiosInstance, GET_ROUTES, PATH_URL, POST_ROUTES } from '../constant';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') ||'');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(token){
            const fetchUserProfile =async()=>{
                const response = await axiosInstance.get(`${GET_ROUTES.GET_USER_PROFILE}`);
                if(response.data.success === true){
                    setUser(response.data.user)
                };
            };
            fetchUserProfile();
        };
    },[token,setUser]);

    const logInAction =async(email,password)=>{
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.SIGN_IN}`,{email,password})
            if(response.data.success === true){
                setToken(response.data.token)
                localStorage.setItem('token',JSON.stringify(response.data.token))
                navigate(PATH_URL.ACCOUNT.BASE);
            };
            
        } catch (error) {
            console.log(error);
        };
    };

    const logOutAction = async()=>{
        const response = await axiosInstance.get(`${GET_ROUTES.LOGOUT}`);
        if(response.data.success === true){
            setToken('');
            setUser('')
            localStorage.clear();
            navigate(PATH_URL.SIGN_IN);
        };
    };

    return (
        <AuthContext.Provider value={{logInAction ,token, user,logOutAction}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = ()=>{
    return useContext(AuthContext);
};
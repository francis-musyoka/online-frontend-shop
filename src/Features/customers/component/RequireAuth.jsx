import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';
import { useAuth } from '../../../context/AuthContext';

const RequireAuth = () => {
    const {token} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            return navigate(PATH_URL.SIGN_IN)
        }
    },[navigate,token]);

    return (
        <Outlet/>
    );
}

export default RequireAuth;

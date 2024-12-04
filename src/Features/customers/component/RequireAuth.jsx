import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/AuthContext';
import { PATH_URL } from '../../../constant';

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

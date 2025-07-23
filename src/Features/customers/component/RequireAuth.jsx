import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';
import { useCustomerAuth } from '../../../hooks/useAppSelectors';

const RequireAuth = () => {
    const { isAuthenticated } = useCustomerAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate(PATH_URL.SIGN_IN)
        }
    }, [navigate, isAuthenticated]);

    return (
        <Outlet />
    );
}

export default RequireAuth;

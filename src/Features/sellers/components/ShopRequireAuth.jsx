import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';
import { useShopAuth } from '../../../hooks/useAppSelectors';

const ShopRequireAuth = () => {
    const navigate = useNavigate();
    const { shopIsAuthenticated } = useShopAuth();

    useEffect(() => {
        if (!shopIsAuthenticated) {
            navigate(PATH_URL.SELL.LOG_IN)
        }
    }, [shopIsAuthenticated, navigate]);

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default ShopRequireAuth;

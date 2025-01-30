import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useShopAuth } from '../../../utils/ShopAuthContext';
import { PATH_URL } from '../../../constant';

const ShopRequireAuth = () => {
    const navigate = useNavigate();
    const {shopToken} = useShopAuth();

    useEffect(()=>{
        if(!shopToken){
            navigate(PATH_URL.SELL.LOG_IN)
        }
    },[shopToken,navigate]);

    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default ShopRequireAuth;

import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';
import { useShopAuth } from '../../../context/ShopAuthContext';

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

import React, { useEffect, useState } from 'react';
import { useContext, createContext } from "react";
import { axiosInstance, GET_ROUTES_SHOP, PATH_URL, POST_ROUTES_SHOP } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';



const AuthContext = createContext();


const ShopAuthProvider = ({ children }) => {
    const [shopToken, setShopToken] = useState(localStorage.getItem("shopToken") || false)
    const [shopProfile, setShopProfile] = useState(null);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const logIn = async (formData) => {
        try {
            const response = await axiosInstance.post(POST_ROUTES_SHOP.LOG_IN, { formData });
            if (response.data.success) {
                setShopToken(true);
                localStorage.setItem('shopToken', JSON.stringify(true));
                showToast("Log in successfully", "success");
                navigate(PATH_URL.SELL.MY_PRODUCTS);
            }
        } catch (error) {
            console.log(error.response.data.error);
            showToast(error.response.data.error, "error")
        }
    };


    const logOut = async () => {
        try {
            const response = await axiosInstance.post(POST_ROUTES_SHOP.LOG_OUT);
            if (response.data.success) {
                setShopProfile(null);
                setShopToken(false);
                localStorage.clear();
                navigate(PATH_URL.HOME);
                showToast('Log out successfully', 'success')
            }
        } catch (error) {
            showToast(error.response.data.error)
        }
    };

    useEffect(() => {
        const fetchShopProfile = async () => {
            try {
                const response = await axiosInstance.get(`${GET_ROUTES_SHOP.GET_SHOP_PROFILE}`);
                if (response.data.authenticated) {
                    setShopToken(response.data.authenticated)
                    setShopProfile(response.data.shopProfile);
                } else {
                    setShopToken(false)
                    setShopProfile(null);
                    localStorage.clear();
                }
            } catch (error) {
                setShopToken(false)
                setShopProfile(null);
                localStorage.clear();
            }

        };
        if (shopToken) {
            fetchShopProfile();
        }


    }, [shopToken]);

    return (
        <AuthContext.Provider value={{ logIn, logOut, shopToken, shopProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export default ShopAuthProvider;


export const useShopAuth = () => {
    return useContext(AuthContext);
};
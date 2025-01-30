import React, { useEffect, useState } from 'react';
import { useContext,createContext } from "react";
import { axiosInstance, GET_ROUTES_SHOP, PATH_URL, POST_ROUTES_SHOP } from '../constant';
import { useToast } from './ToastContext';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();


const ShopAuthProvider = ({children}) => {
    const [shopToken, setShopToken]= useState(sessionStorage.getItem("shopToken") || '')
    const [shopProfile, setShopProfile] = useState('');

    const {showToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (shopToken) { 
            const fetchShopProfile = async () => {
                const response = await axiosInstance.get(`${GET_ROUTES_SHOP.GET_SHOP_PROFILE}`);
                if (response.data.success) {
                    setShopProfile(response.data.shopProfile);
                }
            };
            fetchShopProfile();
        }
    }, [shopToken, setShopProfile]);

    
    
    const logIn = async(formData)=>{
        try {
            const response = await axiosInstance.post(POST_ROUTES_SHOP.LOG_IN,{formData});
            if(response.data.success){
                setShopToken(response.data.token);
                sessionStorage.setItem('shopToken', JSON.stringify(response.data.token));
                showToast("Log in successfully", "success");
                navigate(PATH_URL.SELL.MY_PRODUCTS);
            }
        } catch (error) {
            console.log(error.response.data.error);
            showToast(error.response.data.error, "error")
        }
    };

    const logOut = async()=>{
        try {
            const response = await axiosInstance.post(POST_ROUTES_SHOP.LOG_OUT);
            if(response.data.success){
                setShopProfile('');
                setShopToken('');
                sessionStorage.clear();
                navigate(PATH_URL.HOME);
                showToast('Log out successfully', 'success')
            }
        } catch (error) {
            showToast(error.response.data.error)
        }
    }

    return (
        <AuthContext.Provider value={{logIn, logOut,shopToken,shopProfile}}>
           {children}
        </AuthContext.Provider>
    )
}

export default ShopAuthProvider;


export const useShopAuth = ()=>{
    return useContext(AuthContext);
};
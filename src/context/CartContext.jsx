import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance, GET_ROUTES, PATCH_ROUTES, POST_ROUTES } from '../constant';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { createGuestId } from '../utils';


const cartContext  = createContext();


const CartProvider = (props) => {
    const [cartItem,setCartItem] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    

    const{showToast} = useToast();
    const {token} = useAuth();
    const guestId = localStorage.getItem('guestId') || null;
    

    //Fetch cart
    useEffect(()=>{
        const fetchCart = async()=>{
            try {
                if(token){

                    // Fetch logged-in user cart
                    const response = await axiosInstance.get(GET_ROUTES.GET_CART);
                    if(response.data.success){
                        setCartItem(response.data.cartItems);
                        const totalItems = response.data.cartItems.reduce((sum,item)=>sum+item.quantity,0);
                        setTotalQuantity(totalItems)
                        const totalprice = response.data.cartItems.reduce((sum,item)=>sum+ item.Product.price * item.quantity,0);
                        setTotalAmount(totalprice)
                    };
    
                }else if(guestId){
        
                        // Fetch guest cart
                        const response = await axiosInstance.get(GET_ROUTES.GET_GUEST_CART(guestId));
                        if(response.data.success){
                            setCartItem(response.data.cartItems);
                            const totalItems = response.data.cartItems.reduce((sum,item)=>sum+item.quantity,0);
                            setTotalQuantity(totalItems)
                            const totalprice = response.data.cartItems.reduce((sum,item)=>sum+ item.Product.price * item.quantity,0);
                            setTotalAmount(totalprice)
                        };
                };
                
            } catch (error) {
                showToast(error.response?.data?.error || 'Failed to fetch cart', 'error');
            };
        };
        fetchCart();

    },[showToast,token,guestId]);


    // Add to cart 
    const addToCart = async(productId)=>{

        if(token){
            try {
                const response = await axiosInstance.post(POST_ROUTES.ADD_PRODUCT_TO_CART(productId));
                
                if(response.data.success){
                 showToast(response.data.message, 'success')
                }
             } catch (error) {
                 console.log(error);
                 showToast(error.response.data.error, 'error')
             }
        }else{
            try {
                const guestId = createGuestId();
                const response = await axiosInstance.post(POST_ROUTES.ADD_PRODUCT_TO_GUEST_CART,{productId:productId, guestId});
                
                if(response.data.success){
                 showToast(response.data.message, 'success')
                }
             } catch (error) {
                 console.log(error);
                 showToast(error.response.data.error, 'error')
             }
        }
    }


    // Upate total quantity and Amount
    useEffect(()=>{
        const total = cartItem.reduce((sum,item)=>sum+item.quantity,0);
        setTotalQuantity(total)
        const totalprice = cartItem.reduce((sum,item)=>sum+ item.Product.price * item.quantity,0);
            setTotalAmount(totalprice)
    },[cartItem]);


    // Update cart quantity
    const UpdateCartQuantity = async (productId, newQuantity) => {
        try {
            if (newQuantity === 0) {
                await removeItem(productId);
                return;
            }
    
            if (token) {
                await axiosInstance.patch(PATCH_ROUTES.UPDATE_CART_QUANTITY(productId), { newQuantity });
            } else if (guestId) {
                await axiosInstance.patch(PATCH_ROUTES.UPDATE_GUEST_CART_QUANTITY(productId), { newQuantity ,guestId});
            }
    
            updateCartState(productId, newQuantity);
            
        } catch (error) {
            showToast(error.response?.data?.error || "Failed to update cart quantity", "error");
        }
    };
    
    // Update cart state
    const updateCartState = (productId, newQuantity) => {
        setCartItem(cartItem.map((product) =>
            product.productId === productId ? { ...product, quantity: newQuantity } : product
        ));
    };

    //Remove item from the cart
    const removeItem = async(productId)=>{
       
        try {

            if(token){
                await axiosInstance.post(POST_ROUTES.DELETE_PRODUCT_FROM_CART(productId));
            }else if(guestId){
                await axiosInstance.post(POST_ROUTES.DELETE_PRODUCT_FROM_GUEST_CART(productId),{guestId});
            }
           
            setCartItem(cartItem.filter((product)=> product.productId !== productId));
            
        } catch (error) {
            showToast(error.response?.data?.error ||  "Failed to remove item", "error");
        };
     };



    return (
        <div>
            <cartContext.Provider value={{addToCart, UpdateCartQuantity, removeItem, cartItem, guestId, totalQuantity,totalAmount}}>{props.children}</cartContext.Provider>
        </div>
    );
};

export default CartProvider;


export const useCartContext = ()=>{
    return useContext(cartContext);
};

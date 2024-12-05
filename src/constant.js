import axios from 'axios';


const PATH_URL = {
    HOME: '/',
    CATEGORIES: '/categories',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    CART: '/cart',
    FORGOT_PASSWORD: '/forgotpassword',
    RESETPASSWORD: "/reset-password/:link", 
    ACCOUNT: {
        BASE: '/account',
        PROFILE: '/account/profile',
        ORDERS: '/account/orders',
        FAVOURITES: '/account/favourites',
    },
    SELL: {
        DASHBOARD: '/sell/dashboard',
        CREATE_BUSINESS_ACCOUNT: '/sell/create-business-account',
        LOG_IN: '/sell/login',
        PROFILE: '/sell/dashboard/profile',
        MY_PRODUCTS: '/sell/dashboard/myproducts',
        ADD_PRODUCTS: '/sell/dashboard/add-products',
        EDIT_PRODUCT: '/sell/dashboard/edit-product'
    },
};


// apiRoutes.js
const POST_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    FORGOT_PASSWORD: '/forgotpassword',
    RESET_PASSWORD:(link) => `/resetpassword/${link}`,
};
  
const GET_ROUTES = {
    GET_SINGLE_USER: (id) => `/getsingleuser/${id}`,
    GET_USER_PROFILE: '/get-user-profile',
    LOGOUT: `/logout`,
    GET_ALL_USERS: '/get-all-users'
};
  
  const PATCH_ROUTES = {
    UPDATE_USER_PROFILE: (id) => `/update-user-profile/${id}`,
    UPDATE_USER_PASSWORD: (id) => `/update-user-password/${id}`,
  };
  
  

 // Axios instance
 const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true 
});

export {PATH_URL, POST_ROUTES, GET_ROUTES, PATCH_ROUTES , axiosInstance};
import axios from 'axios';


const PATH_URL = {
    HOME: '/',
    CATEGORIES: '/categories',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    CART: '/cart',
    FORGOT_PASSWORD: '/forgotpassword',
    RESETPASSWORD: "/reset-password/:link", 
    PRODUCT_DETAILS: '/:product-name',
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
        EDIT_PRODUCT: '/sell/dashboard/edit-product',
        FORGOT_PASSWORD: '/sell/forgotpassword',
        RESET_SHOP_PASSWORD: '/sell/reset-password/:link',
        
    },
};


// Customer Apis
const POST_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    FORGOT_PASSWORD: '/forgotpassword',
    RESET_PASSWORD:(link) => `/resetpassword/${link}`,
    ADD_AND_REMOVE_WISHLIST:(productId) => `/add/remove/${productId}`
};

const GET_ROUTES = {
    GET_SINGLE_USER: (id) => `/getsingleuser/${id}`,
    GET_USER_PROFILE: '/get-user-profile',
    LOGOUT: `/logout`,
    GET_ALL_USERS: '/get-all-users',
    GET_ALL_PRODUCTS: `all/products`,
    ChECK_IS_IN_WISHLIST:(productId) =>`/check/product/${productId}`,
    GET_PRODUCTS_IN_WISHLIST: `/wishlist/product`,
    GET_SINGLE_PRODUCT:(id) => `/single/product/${id}`
};
  
const PATCH_ROUTES = {
  UPDATE_USER_PROFILE: (id) => `/update-user-profile/${id}`,
  UPDATE_USER_PASSWORD: (id) => `/update-user-password/${id}`,
};


// Shop apis
const POST_ROUTES_SHOP ={
  CREATE_ACCOUNT: `/create-shop`,
  LOG_IN: `/login`,  
  FORGOT_PASSWORD: `/shop/forgotpassword`,
  LOG_OUT: `/shop/logout`,
  RESET_PASSWORD:(link) => `/resetshoppassword/${link}`,
  UPDATE_SHOP_PROFILR:(id) => `/update-shop-profile/${id}`,
  ADD_CATEGORY: '/add-category',
  ADD_PRODUCTS: '/add-product',
  DELETE_PRODUCT:(productId) => `/delete/product/${productId}`

}
  
const GET_ROUTES_SHOP ={
  GET_SINGLE_SHOP:(id) =>`/get-single-shop/${id}`,
  GET_ALL_SHOPS: `/get-all-shops`,
  GET_SHOP_PROFILE: `/get-shop-profile`,
  GET_ALL_CATEGORIES: '/get-all-category',
  GET_SHOP_PRODUCT: '/shop/product',
  CURRENT_PRODUCT_ON_EDIT:(id) => `/single/product/for/edit/${id}`
}

const PUT_ROUTES_SHOP ={
  EDIT_PRODUCT:(id) => `/shop/edit/product/${id}`
}

 // Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true 
});

const BASEURL = 'http://localhost:5000'

export {PATH_URL, POST_ROUTES, GET_ROUTES, PATCH_ROUTES , POST_ROUTES_SHOP, GET_ROUTES_SHOP, PUT_ROUTES_SHOP,BASEURL, axiosInstance};
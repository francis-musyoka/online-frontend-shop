import { developementApi, productionApi } from './utils/config';

const PATH_URL = {
  HOME: '/',
  CATEGORIES: '/categories',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CART: '/cart',
  FORGOT_PASSWORD: '/forgotpassword',
  RESETPASSWORD: "/reset-password/:link",
  PRODUCT_DETAILS: '/:productId/:product-name',
  REVIEWS_DISPLAY: '',
  ADD_ADDRESS: '/book_address',
  CHECK_OUT: '/checkout/summary',
  ORDER_SUMMARY: (orderNumber) => `/orders/${orderNumber}`,
  EMAIL: '/email',

  ACCOUNT: {
    BASE: '/account',
    PROFILE: '/account/profile',
    ADDRESS: '/account/addresses',
    ORDERS: '/account/orders',
    FAVOURITES: '/account/favourites',
  },
  SELL: {
    DASHBOARD: '/sell/dashboard',
    CREATE_BUSINESS_ACCOUNT: '/sell/create-business-account',
    LOG_IN: '/sell/login',
    PROFILE: '/sell/dashboard/profile',
    MY_PRODUCTS: '/sell/dashboard/myproducts',
    ADD_CATEGORY: '/sell/dashboard/add-category',
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
  RESET_PASSWORD: (link) => `/resetpassword/${link}`,
  ADD_AND_REMOVE_WISHLIST: (productId) => `/add/remove/${productId}`,
  ADD_PRODUCT_TO_CART: (productId) => `/addproducttocart/${productId}`,
  DELETE_PRODUCT_FROM_CART: (productId) => `/delete/cart/${productId}`,
  ADD_PRODUCT_TO_GUEST_CART: `/addproducttoguestcart`,
  DELETE_PRODUCT_FROM_GUEST_CART: (productId) => `/delete/guestcart/${productId}`,
  ADD_ADDRESS: '/add-new-address',
  DELETE_ADDRESS: (addressId) => `/remove/address/${addressId}`,
  SET_DEFAULT_ADDRESS: (addressId) => `/set/address/default/${addressId}`,
  MPESA_PAYMENT: `/savempesapayment`,
  DELETE_MPESA_PAYMENT: (id) => `/delete/mpesapayment/${id}`,
  MPESA_TRANSCATION: '/stkpush',
  CREATE_ORDER: "/create/order",
  CLEAR_CART: "/clear/cart",

};

const GET_ROUTES = {
  GET_SINGLE_USER: (id) => `/getsingleuser/${id}`,
  GET_USER_PROFILE: '/get-user-profile',
  LOGOUT: `/logout`,
  GET_ALL_USERS: '/get-all-users',
  GET_ALL_PRODUCTS: `/all/products`,
  ChECK_IS_IN_WISHLIST: (productId) => `/check/product/${productId}`,
  GET_PRODUCTS_IN_WISHLIST: `/wishlist/product`,
  GET_SINGLE_PRODUCT: (id) => `/single/product/${id}`,
  GET_LIMITTED_PRODUCTS_IN_WHISHLIST: '/wishlist-limitted/product',
  GET_CART: `/cart`,
  GET_GUEST_CART: (guestId) => `/guestcart/${guestId}`,
  GET_ADDRESSES: '/addresses',
  GET_MPESA_PAYMENT: '/mpesapayment',
  GET_MPESA_TRANSACTION_STATUS: (transactionId) => `/mpesa/transaction/status/${transactionId}`,
  GET_ORDER_SUMMARY: (orderId) => `/order/summary/${orderId}`

};

const PATCH_ROUTES = {
  UPDATE_USER_PROFILE: (id) => `/update-user-profile/${id}`,
  UPDATE_USER_PASSWORD: (id) => `/update-user-password/${id}`,
  UPDATE_CART_QUANTITY: (productId) => `/update/cart/${productId}`,
  UPDATE_GUEST_CART_QUANTITY: (productId) => `/update/guestcart/${productId}`,
  UPDATE_ADDRESS: (addressId) => `/update/address/${addressId}`,
  UPDATE_MPESA_PAYMENT: (id) => `/update/mpesapayment/${id}`,
  UPDATE_ORDER: (orderId) => `/update/order/${orderId}`
};


// Shop apis
const POST_ROUTES_SHOP = {
  CREATE_ACCOUNT: `/create-shop`,
  LOG_IN: `/login`,
  FORGOT_PASSWORD: `/shop/forgotpassword`,
  LOG_OUT: `/shop/logout`,
  RESET_PASSWORD: (link) => `/resetshoppassword/${link}`,
  UPDATE_SHOP_PROFILR: (id) => `/update-shop-profile/${id}`,
  ADD_CATEGORY: '/add-category',
  ADD_PRODUCTS: '/add-product',
  DELETE_PRODUCT: (productId) => `/delete/product/${productId}`,

}

const GET_ROUTES_SHOP = {
  GET_SINGLE_SHOP: (id) => `/get-single-shop/${id}`,
  GET_ALL_SHOPS: `/get-all-shops`,
  GET_SHOP_PROFILE: `/get-shop-profile`,
  GET_ALL_CATEGORIES: '/get-all-category',
  GET_SHOP_PRODUCT: '/shop/product',
  CURRENT_PRODUCT_ON_EDIT: (id) => `/single/product/for/edit/${id}`
}

const PUT_ROUTES_SHOP = {
  EDIT_PRODUCT: (id) => `/shop/edit/product/${id}`
}

const BASEURL = process.env.NODE_ENV === 'production' ? productionApi : developementApi;  // backend url


export { PATH_URL, POST_ROUTES, GET_ROUTES, PATCH_ROUTES, POST_ROUTES_SHOP, GET_ROUTES_SHOP, PUT_ROUTES_SHOP, BASEURL, };
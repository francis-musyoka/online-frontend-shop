import './App.css'
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import { PATH_URL } from './constant';

import Categories from './Features/customers/pages/Categories';
import SignIn from './Features/customers/pages/SignIn';
import SignUp from './Features/customers/pages/SignUp';
import Layout from './Features/customers/component/Layout';
import RequireAuth from './Features/customers/component/RequireAuth';
import ToastProvider from './context/ToastContext';
import ShopRequireAuth from './Features/sellers/components/ShopRequireAuth';
import Spinning from './components/Spinning';

// Lazy loaded components
const Home = lazy(() => import('./Features/customers/pages/Home'));
const ProductDetails = lazy(() => import('./Features/customers/pages/ProductDetails'));
const Cart = lazy(() => import('./Features/customers/pages/Cart'))
const Favourite = lazy(() => import('./Features/customers/pages/Account/Favourite'));
const Account = lazy(() => import('./Features/customers/pages/Account/Account'));
const Profile = lazy(() => import('./Features/customers/pages/Account/Profile'));
const Orders = lazy(() => import('./Features/customers/pages/Account/Orders'));
const Addresses = lazy(() => import('./Features/customers/pages/Account/Addresses'));
const AddAddress = lazy(() => import('./Features/customers/component/AddAddress'));
const CheckOut = lazy(() => import('./Features/customers/pages/CheckOut'));
const OrderSummary = lazy(() => import('./Features/customers/pages/orderSummary'));
const Email = lazy(() => import('./Features/customers/pages/email'));
const ForgotPassword = lazy(() => import('../src/Features/customers/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../src/Features/customers/pages/ResetPassword'));
const NotFound = lazy(() => import('./components/NotFound'));
const Login = lazy(() => import('./Features/sellers/pages/Login'));
const SellDashBoard = lazy(() => import('./Features/sellers/pages/SellDashBoard'));
const AddProduct = lazy(() => import('./Features/sellers/pages/AddProduct'));
const EditProduct = lazy(() => import('./Features/sellers/pages/EditProduct'));
const ShopProfile = lazy(() => import('./Features/sellers/pages/ShopProfile'));
const MyProducts = lazy(() => import('./Features/sellers/pages/MyProducts'));
const CreateAccount = lazy(() => import('./Features/sellers/pages/CreateAccount'));
const ForgotPasswordShop = lazy(() => import('./Features/sellers/pages/ForgotPasswordShop'));
const ResetShopPassword = lazy(() => import('./Features/sellers/ResetShopPassword'));
const AddCategory = lazy(() => import('./Features/sellers/pages/AddCategory'));

function App() {

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Spinning />}>
                    <ToastProvider>
                        <Routes>
                            {/* customers */}
                            <Route path={PATH_URL.HOME} element={<Layout />}>
                                <Route path={PATH_URL.HOME} element={<Home />} />
                                <Route path={PATH_URL.CATEGORIES} element={<Categories />} />
                                <Route path={PATH_URL.SIGN_IN} element={<SignIn />} />
                                <Route path={PATH_URL.CART} element={<Cart />} />

                                <Route element={<RequireAuth />}>
                                    <Route path={PATH_URL.ACCOUNT.BASE} element={<Account />}>
                                        <Route path={PATH_URL.ACCOUNT.PROFILE} element={<Profile />} />
                                        <Route path={PATH_URL.ACCOUNT.ADDRESS} element={<Addresses />} />
                                        <Route path={PATH_URL.ACCOUNT.ORDERS} element={<Orders />} />
                                        <Route path={PATH_URL.ACCOUNT.FAVOURITES} element={<Favourite />} />
                                    </Route>

                                </Route>
                                <Route path={PATH_URL.ADD_ADDRESS} element={<AddAddress />} />
                                <Route path={PATH_URL.PRODUCT_DETAILS} element={<ProductDetails />} />
                                <Route path={PATH_URL.CHECK_OUT} element={<CheckOut />} />
                                <Route path="/orders/:orderNumber" element={<OrderSummary />} />

                            </Route>
                            <Route path={PATH_URL.EMAIL} element={<Email />} />
                            <Route path={PATH_URL.RESETPASSWORD} element={<ResetPassword />} />
                            <Route path={PATH_URL.FORGOT_PASSWORD} element={<ForgotPassword />} />
                            <Route path={PATH_URL.SIGN_UP} element={<SignUp />} />
                            <Route path='*' element={<NotFound />} />

                            {/* SELLER ROUTES */}
                            <Route path={PATH_URL.SELL.LOG_IN} element={<Login />} />
                            <Route element={<ShopRequireAuth />}>
                                <Route path={PATH_URL.SELL.DASHBOARD} element={<SellDashBoard />}>
                                    <Route path={PATH_URL.SELL.PROFILE} element={<ShopProfile />} />
                                    <Route path={PATH_URL.SELL.ADD_PRODUCTS} element={<AddProduct />} />
                                    <Route path={PATH_URL.SELL.MY_PRODUCTS} element={<MyProducts />} />
                                    <Route path={PATH_URL.SELL.EDIT_PRODUCT} element={<EditProduct />} />
                                    <Route path={PATH_URL.SELL.ADD_CATEGORY} element={<AddCategory />} />
                                </Route>
                            </Route>
                            <Route path={PATH_URL.SELL.CREATE_BUSINESS_ACCOUNT} element={<CreateAccount />} />
                            <Route path={PATH_URL.SELL.FORGOT_PASSWORD} element={<ForgotPasswordShop />} />
                            <Route path={PATH_URL.SELL.RESET_SHOP_PASSWORD} element={<ResetShopPassword />} />
                        </Routes>
                    </ToastProvider>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;

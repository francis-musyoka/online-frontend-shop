import './App.css'
import {BrowserRouter,Route, Routes,Outlet} from 'react-router-dom'
import Home from './Features/customers/pages/Home';
import Categories from './Features/customers/pages/Categories';
import SignIn from './Features/customers/pages/SignIn';
import Cart from './Features/customers/pages/Cart';
import SignUp from './Features/customers/pages/SignUp';
import Layout from './Features/customers/component/Layout';
import Favourite from './Features/customers/pages/Account/Favourite';
import Account from './Features/customers/pages/Account/Account';
import Profile from './Features/customers/pages/Account/Profile';
import Orders from './Features/customers/pages/Account/Orders';
import { PATH_URL } from './constant';
import ForgotPassword from '../src/Features/customers/pages/ForgotPassword';
import Login from './Features/sellers/pages/Login';
import SellDashBoard from './Features/sellers/pages/SellDashBoard';
import AddProduct from './Features/sellers/pages/AddProduct';
import EditProduct from './Features/sellers/pages/EditProduct';
import ShopProfile from './Features/sellers/pages/ShopProfile';
import MyProducts from './Features/sellers/pages/MyProducts';
import CreateAccount from './Features/sellers/pages/CreateAccount';
import AuthProvider from './context/AuthContext';
import ShopAuthProvider from './context/ShopAuthContext';
import RequireAuth from './Features/customers/component/RequireAuth';
import ToastProvider from './context/ToastContext';
import NotFound from './components/NotFound';
import ResetPassword from '../src/Features/customers/pages/ResetPassword';
import ForgotPasswordShop from './Features/sellers/pages/ForgotPasswordShop';
import ResetShopPassword from './Features/sellers/ResetShopPassword';
import ShopRequireAuth from './Features/sellers/components/ShopRequireAuth';
import ProductDetails from './Features/customers/pages/ProductDetails';
import CartProvider from './context/CartContext';

function App() {

 
  return (
    <>
        <BrowserRouter>
            <ToastProvider>
                <Routes>

                    {/* customers */}
                    <Route path={PATH_URL.HOME} element={<AuthProvider><Layout/></AuthProvider>}>
                    <Route element={<CartProvider><Outlet/></CartProvider>}>
                        <Route path={PATH_URL.HOME} element={<Home />} />
                        <Route path={PATH_URL.CATEGORIES} element={<Categories />} />
                        <Route path={PATH_URL.SIGN_IN} element={<SignIn />} />
                        <Route path={PATH_URL.CART} element={<Cart />} />
                        <Route element={<RequireAuth/>}>
                            <Route path={PATH_URL.ACCOUNT.BASE} element={<Account />}>
                                <Route path={PATH_URL.ACCOUNT.PROFILE} element={<Profile />} />
                                <Route path={PATH_URL.ACCOUNT.ORDERS} element={<Orders />} />
                                <Route path={PATH_URL.ACCOUNT.FAVOURITES} element={<Favourite />} />
                            </Route>
                        </Route>
                        <Route path={PATH_URL.PRODUCT_DETAILS} element={<ProductDetails/>}/>
                    </Route>
                    </Route>
                    <Route path={PATH_URL.RESETPASSWORD} element={<ResetPassword/>}/>
                    <Route path={PATH_URL.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                    <Route path={PATH_URL.SIGN_UP} element={<SignUp />} />
                    <Route path='*' element ={<NotFound/>}/>
                
                    {/* SELLER ROUTES */}
                    <Route element={<ShopAuthProvider><Outlet/></ShopAuthProvider>}>
                        <Route path={PATH_URL.SELL.LOG_IN} element={<Login/>}/>
                        <Route element={<ShopRequireAuth/>}>
                            <Route path={PATH_URL.SELL.DASHBOARD} element={<SellDashBoard />}>
                                <Route path={PATH_URL.SELL.PROFILE} element={<ShopProfile/>}/>
                                <Route path={PATH_URL.SELL.ADD_PRODUCTS} element={<AddProduct/>}/>
                                <Route path={PATH_URL.SELL.MY_PRODUCTS} element={<MyProducts/>}/>
                                <Route path={PATH_URL.SELL.EDIT_PRODUCT} element={<EditProduct/>}/>
                            </Route>
                        </Route>    
                    </Route>
                    <Route path={PATH_URL.SELL.CREATE_BUSINESS_ACCOUNT} element={<CreateAccount />} />
                    <Route path={PATH_URL.SELL.FORGOT_PASSWORD} element={<ForgotPasswordShop/>} />
                    <Route path={PATH_URL.SELL.RESET_SHOP_PASSWORD} element={<ResetShopPassword/>} />
                </Routes>   
            </ToastProvider>
        </BrowserRouter>
    </>
  );
}

export default  App;

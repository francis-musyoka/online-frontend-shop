import './App.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
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
import ForgotPassword from './components/ForgotPassword';
import Login from './Features/sellers/pages/Login';
import SellDashBoard from './Features/sellers/pages/SellDashBoard';
import AddProduct from './Features/sellers/pages/AddProduct';
import EditProduct from './Features/sellers/pages/EditProduct';
import ShopProfile from './Features/sellers/pages/ShopProfile';
import MyProducts from './Features/sellers/pages/MyProducts';
import CreateAccount from './Features/sellers/pages/CreateAccount';
import AuthProvider from './utils/useContext';
import RequireAuth from './Features/customers/component/RequireAuth';

function App() {
  
  return (
    <>
      <BrowserRouter>
        {/* customers */}
        <AuthProvider>
          <Routes>
            <Route path={PATH_URL.HOME} element={<Layout/>}>
              <Route path={PATH_URL.HOME} element={<Home />} />
              <Route path={PATH_URL.CATEGORIES} element={<Categories />} />
              <Route path={PATH_URL.SIGN_IN} element={<SignIn />} />
              <Route path={PATH_URL.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
              <Route path={PATH_URL.CART} element={<Cart />} />
              <Route element={<RequireAuth/>}>
                <Route path={PATH_URL.ACCOUNT.BASE} element={<Account />}>
                  <Route path={PATH_URL.ACCOUNT.PROFILE} element={<Profile />} />
                  <Route path={PATH_URL.ACCOUNT.ORDERS} element={<Orders />} />
                  <Route path={PATH_URL.ACCOUNT.FAVOURITES} element={<Favourite />} />
                </Route>
              </Route>
            </Route>
            <Route path={PATH_URL.SIGN_UP} element={<SignUp />} />
          </Routes>
        </AuthProvider>

        {/* SELLER ROUTES */}
        <Routes>

          <Route path={PATH_URL.SELL.DASHBOARD} element={<SellDashBoard />}>
            <Route path={PATH_URL.SELL.PROFILE} element={<ShopProfile/>}/>
            <Route path={PATH_URL.SELL.ADD_PRODUCTS} element={<AddProduct/>}/>
            <Route path={PATH_URL.SELL.MY_PRODUCTS} element={<MyProducts/>}/>
            <Route path={PATH_URL.SELL.EDIT_PRODUCT} element={<EditProduct/>}/>
          </Route>
          <Route path={PATH_URL.SELL.CREATE_BUSINESS_ACCOUNT} element={<CreateAccount />} />
          <Route path={PATH_URL.SELL.LOG_IN} element={<Login/>}/>

        </Routes>      
      </BrowserRouter>
    </>
  );
}

export default  App;

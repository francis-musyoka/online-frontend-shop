import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { PATH_URL } from '../../../constant';
import { useCustomerAuth } from '../../../hooks/useAppSelectors';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../../redux/actionsCreators/cartAction';
import { useEffect } from 'react';

let fetched = false

const Layout = () => {
    const { isAuthenticated } = useCustomerAuth();
    const guestId = localStorage.getItem("guestId");
    const dispatch = useDispatch()
    useEffect(() => {
        if (!fetched) {
            dispatch(fetchCart(isAuthenticated, guestId));
            fetched = true
        }
    }, [dispatch, guestId, isAuthenticated]);
    return (
        <div className='bg-tertiary '>
            <div className=" flex  p-3">
                <div className="items-center ml-auto">
                    <Link to={PATH_URL.SELL.LOG_IN} target='_blank' className="text-secondary hover:underline ">
                        Open Shop
                    </Link>
                </div>
            </div>
            <header className="bg-primary sticky top-0 z-10">
                <Navbar />
            </header>

            <div className='min-h-screen' >
                <Outlet />
            </div>

            <div>
                <Footer />
            </div>

        </div>
    );
};

export default Layout;

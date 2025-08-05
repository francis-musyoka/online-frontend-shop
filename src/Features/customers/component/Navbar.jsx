
import { NavLink } from 'react-router-dom';
import { FiLogIn, FiMenu } from 'react-icons/fi';
import { BsCartCheck } from 'react-icons/bs';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { FaHome } from "react-icons/fa";
import { PATH_URL } from '../../../constant';
import { useCart, useCustomerAuth } from '../../../hooks/useAppSelectors';
import SearchBar from './SearchBar';




const Navbar = () => {
    const { isAuthenticated } = useCustomerAuth();
    const { totalQuantity } = useCart();

    return (
        <nav className="">
            <div className="max-w-screen-xl mx-auto p-4 ">
                <div className="flex flex-col md:hidden">
                    <div className="flex items-center justify-between space-x-4">
                        <NavLink to={PATH_URL.CATEGORIES} className={({ isActive }) => `flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <FiMenu size={20} />
                        </NavLink>
                        <NavLink to={PATH_URL.HOME} className={({ isActive }) => `flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <FaHome size={20} />
                        </NavLink>
                        {!isAuthenticated ? (
                            <NavLink to={PATH_URL.SIGN_IN} className={({ isActive }) => `flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                                <FiLogIn size={20} />
                            </NavLink>
                        ) : (
                            <NavLink to={PATH_URL.ACCOUNT.BASE} className={({ isActive }) => `flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                                <HiMiniUserCircle size={20} />
                            </NavLink>
                        )
                        }


                        <NavLink to={PATH_URL.CART} className={({ isActive }) => `flex-1 flex justify-center relative ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <div className="relative">
                                <BsCartCheck size={20} />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                        {totalQuantity}
                                    </span>
                                )}
                            </div>
                        </NavLink>
                    </div>

                    <SearchBar />
                </div>


                <div className="hidden md:flex md:items-center md:justify-between">
                    <div className="flex items-center space-x-16">
                        <NavLink
                            to={PATH_URL.HOME}
                            className={({ isActive }) =>
                                `text-sm font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to={PATH_URL.CATEGORIES}
                            className={({ isActive }) =>
                                `text-sm font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                            }
                        >
                            Category
                        </NavLink>
                    </div>

                    <SearchBar />

                    <div className="flex items-center space-x-16">
                        {!isAuthenticated ? (
                            <NavLink
                                to={PATH_URL.SIGN_IN}
                                className={({ isActive }) =>
                                    `text-sm font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                                }
                            >
                                <FiLogIn size={20} className="inline-block" /> Sign In
                            </NavLink>
                        ) : (
                            <NavLink
                                to={PATH_URL.ACCOUNT.BASE}
                                className={({ isActive }) =>
                                    `text-sm font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                                }
                            >
                                <HiMiniUserCircle size={24} className="inline-block" /> Account
                            </NavLink>
                        )

                        }
                        <NavLink
                            to={PATH_URL.CART}
                            className={({ isActive }) =>
                                `relative inline-flex items-center text-sm font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'
                                }`
                            }
                        >
                            <div className="relative">
                                <BsCartCheck size={20} />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                        {totalQuantity}
                                    </span>
                                )}
                            </div>
                            <span className="ml-2">Cart</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;




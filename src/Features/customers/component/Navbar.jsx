
import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogIn, FiMenu } from 'react-icons/fi';
import { BsCartCheck } from 'react-icons/bs';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { GrSearch } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { PATH_URL } from '../../../constant';
import { useAuth } from '../../../utils/AuthContext';


const Navbar = () => {
    const {token} = useAuth();

    return (
        <nav className="">
            <div className="max-w-screen-xl mx-auto p-4 ">
                <div className="flex flex-col md:hidden">
                    <div className="flex items-center justify-between space-x-4">
                        <NavLink to={PATH_URL.CATEGORIES} className={({ isActive }) =>`flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <FiMenu size={26}/>
                        </NavLink>
                        <NavLink to={PATH_URL.HOME} className={({ isActive }) =>`flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <FaHome size={26} />
                        </NavLink>
                        { !token ?(
                                <NavLink to={PATH_URL.SIGN_IN} className={({ isActive }) =>`flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                                    <FiLogIn size={26}/>
                                </NavLink>
                            ):(
                                <NavLink to={PATH_URL.ACCOUNT.BASE} className={({ isActive }) =>`flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                                    <HiMiniUserCircle size={26}/>
                                </NavLink>
                            )
                        }
                        
                        
                        <NavLink to={PATH_URL.CART} className={({ isActive }) =>`flex-1 flex justify-center ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`}>
                            <BsCartCheck size={26}  />
                        </NavLink>
                    </div>

                    <div className="relative w-full max-w-lg px-3 pt-3">
                        <div className="absolute inset-y-0 left-5 flex items-center pt-3">
                            <GrSearch className="w-6 h-6 text-neutral" />
                        </div>
                        <input
                            type="search"
                            id="search-navbar"
                            className="block w-full pl-12 p-2 text-sm border border-gray-300 rounded-lg bg-tertiary text-neutral placeholder-neutral"
                            placeholder="Search..."
                        />
                       
                    </div>
                </div>

               
                <div className="hidden md:flex md:items-center md:justify-between">
                    <div className="flex items-center space-x-16">
                        <NavLink
                            to={PATH_URL.HOME}
                            className={({ isActive }) => 
                                `text-lg font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to={PATH_URL.CATEGORIES}
                            className={({ isActive }) => 
                                `text-lg font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                            }
                        >
                            Category
                        </NavLink>
                    </div>

                    <div className="relative w-full max-w-lg px-3">
                        <div className="absolute inset-y-0 left-5 flex items-center">
                            <GrSearch className="w-6 h-6 text-neutral" />
                        </div>
                        <input
                            type="search"
                            id="search-navbar"
                            className="block w-full pl-12 p-2 text-sm border border-gray-300 rounded-lg bg-tertiary text-neutral placeholder-neutral"
                            placeholder="Search..."
                            aria-label="Search through site content"
                        />
                        </div>

                    <div className="flex items-center space-x-16">
                        { !token ?(
                                <NavLink
                                    to={PATH_URL.SIGN_IN}
                                    className={({ isActive }) => 
                                        `text-lg font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                                        }
                                >
                                    <FiLogIn size={24} className="inline-block" /> Sign In
                                </NavLink>
                            ):(
                                <NavLink
                                    to={PATH_URL.ACCOUNT.BASE}
                                    className={({ isActive }) => 
                                        `text-lg font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                                    }
                                >
                                    <HiMiniUserCircle size={24} className="inline-block" /> Account
                                </NavLink>
                            )

                        }
                        <NavLink
                            to={PATH_URL.CART}
                            className={({ isActive }) => 
                                `text-lg font-mono ${isActive ? 'dark:text-gray-950' : 'text-white hover:text-secondary'}`
                            }
                        >
                            <BsCartCheck size={24} className="inline-block" /> Cart
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;




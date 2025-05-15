
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { RiUserLine } from 'react-icons/ri';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineDown } from 'react-icons/ai';
import { FcAddressBook } from "react-icons/fc";
import { useHooks } from '../../../../hooks/useHooks';
import { useAuth } from '../../../../context/AuthContext';


const Account = () => {
    const [selectedOption, setSelectedOption] = useState("My Profile");
    const { status: isDropdownOpen, handleStatus: toggleDropdown } = useHooks();
    const { logOutAction } = useAuth();

    // Function to handle option selection
    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update the selected option
        toggleDropdown()     // Close the dropdown after selecting
    };

    const handleLogOut = () => {
        logOutAction()
    }

    return (
        <div className="md:flex  m-2">
            <div className="md:hidden">
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-between w-full px-4 py-3 border rounded-lg text-gray-700 dark:text-black bg-white dark:bg-gray-200"
                    >
                        <span>{selectedOption}</span>
                        <AiOutlineDown
                            className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute w-full mt-2 border rounded-lg bg-white dark:bg-gray-200 shadow-lg z-10">
                            <NavLink
                                to="/account/profile"


                                onClick={() => handleOptionClick("My Profile")}
                                className="block px-4 py-3 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                            >
                                <RiUserLine className="inline-block mr-3" size={24} />
                                My Profile
                            </NavLink>

                            <NavLink
                                to="addresses"
                                onClick={() => handleOptionClick("Your Addresses")}
                                className="block px-4 py-3 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                            >
                                <FcAddressBook className="inline-block mr-3" size={24} />
                                Your Addresses
                            </NavLink>
                            <NavLink
                                to="orders"
                                onClick={() => handleOptionClick("My Orders")}
                                className="block px-4 py-3 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                            >
                                <HiOutlineShoppingBag className="inline-block mr-3" size={24} />
                                My Orders
                            </NavLink>

                            <NavLink
                                to="favourites"
                                onClick={() => handleOptionClick(`My Favourites`)}
                                className="block px-4 py-3 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                            >
                                <MdFavoriteBorder className="inline-block mr-3" size={24} />
                                My Favourites
                            </NavLink>

                            <NavLink
                                onClick={handleLogOut}
                                className="block px-4 py-3 hover:bg-gray-100 transition duration-300 ease-in-out w-full text-left"
                            >
                                <FiLogOut className="inline-block mr-3" size={24} />
                                Log Out
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>


            <div className="hidden md:flex flex-col space-y-4 text-lg font-medium text-gray-700 dark:text-black md:w-1/4 m-8" >
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full ${isActive ? 'bg-gray-200' : ''}`
                    }
                >
                    <RiUserLine className="mr-3" size={28} />
                    My Profile
                </NavLink>


                <NavLink
                    to="addresses"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full ${isActive ? 'bg-gray-200' : ''}`
                    }
                >
                    <FcAddressBook className="mr-3" size={28} />
                    Your Addresses
                </NavLink>

                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full ${isActive ? 'bg-gray-200' : ''}`
                    }
                >
                    <HiOutlineShoppingBag className="mr-3" size={28} />
                    My Orders
                </NavLink>

                <NavLink
                    to="favourites"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full ${isActive ? 'bg-gray-200' : ''}`
                    }
                >
                    <MdFavoriteBorder className="mr-3" size={28} />
                    My Favourites
                </NavLink>

                <NavLink
                    onClick={handleLogOut}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out w-full"
                >
                    <FiLogOut className="mr-3" size={28} />
                    Log Out
                </NavLink>
            </div>

            {/* Content Section */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );

};

export default Account;

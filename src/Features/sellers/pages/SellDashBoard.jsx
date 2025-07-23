
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { RiListView, RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaBullhorn, FaGift } from "react-icons/fa";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { MdArrowBackIosNew } from "react-icons/md";
import { PATH_URL } from "../../../constant";
import { shopLogOutAction } from "../../../redux/actionsCreators/shopAuthActions";
import { useShopAuth } from "../../../hooks/useAppSelectors";
import { useEffect } from "react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch } from "react-redux";


const SellDashBoard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { error } = useShopAuth();
    const { showToast } = useToast();

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(shopLogOutAction());
    }

    useEffect(() => {
        if (error) {
            showToast(error, "error")
        }
    }, [error, showToast]);

    return (
        <div className="bg-tertiary min-h-screen">
            <div >
                {/* Small Icon Sidebar */}
                {!isSidebarOpen && (
                    <div className="fixed top-0 left-0 h-screen w-16 bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-4 space-y-4 shadow-lg">
                        <button onClick={toggleSidebar} className="p-2">
                            <SlMenu className="w-6 h-6 text-gray-500" />
                        </button>
                        <button onClick={toggleSidebar} className="p-2">
                            <RiListView className="w-6 h-6 text-gray-500" />
                        </button>
                        <button onClick={toggleSidebar} className="p-2">
                            <HiOutlineShoppingBag className="w-6 h-6 text-gray-500" />
                        </button>
                        <button onClick={toggleSidebar} className="p-2">
                            <FaBullhorn className="w-6 h-6 text-gray-500" />
                        </button>
                        <button onClick={toggleSidebar} className="p-2">
                            <FiUsers className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                )}

                {/* Full Sidebar */}
                <aside
                    id="sidebar-multi-level-sidebar"
                    className={`fixed top-0 left-0 z-40 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
                        }`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto">
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                        >
                            <MdArrowBackIosNew className="w-5 h-5" />
                        </button>

                        {/* Sidebar Links */}
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    to="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <SlMenu className="w-5 h-5 text-gray-500" />
                                    <span className="ms-3">Your Shop</span>
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                                    type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls="dropdown-example"
                                    aria-expanded={isDropdownOpen}
                                >
                                    <RiListView className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ms-3 whitespace-nowrap">Products</span>
                                    <RiArrowDownSLine className="w-3 h-3 ms-2" size={26} />
                                </button>

                                <ul id="dropdown-example" className={`py-2 space-y-2 ${isDropdownOpen ? "block" : "hidden"}`}>
                                    <li>
                                        <Link
                                            to={PATH_URL.SELL.MY_PRODUCTS}
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            My Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={PATH_URL.SELL.ADD_PRODUCTS}
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Add Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={PATH_URL.SELL.ADD_CATEGORY}
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Add Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Invoice
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    to="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <HiOutlineShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <FaGift className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Promotion</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <FaBullhorn className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        Advertise your product
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PATH_URL.SELL.PROFILE}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <FiUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <NavLink
                                    onClick={handleClick}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <FiLogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>

                <main
                    className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} p-4`}>
                    <Outlet />
                </main>
            </div>


        </div>
    );
};

export default SellDashBoard;


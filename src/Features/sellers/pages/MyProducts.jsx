import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../../constant';


const MyProducts = () => {
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src="https://phonesstorekenya.com/wp-content/uploads/2024/09/Apple-Watch-Series-10-46mm.jpg" className="w-10 md:w-32 max-w-20 max-h-20" alt="Apple Watch"/>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Apple Watch
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                1
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Watchs
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $599
                            </td>
                            <td className="px-6 py-4">
                                <Link to={PATH_URL.SELL.EDIT_PRODUCT} className=" text-lime-400 px-4 py-2 hover:underline">
                                    Edit
                                </Link>
                                <button className="font-medium px-4 py-2 text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src="https://phonesstorekenya.com/wp-content/uploads/2024/08/iPad-Pro-129-Inch-M2-6th-Gen-Smart-Folio-Keyboard.jpg" className="w-10 md:w-32 max-w-20 max-h-20" alt="Apple iMac"/>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                iMac 27"
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                1
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Laptops
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $2499
                            </td>
                            <td className="px-6 py-4">
                                <Link to={PATH_URL.SELL.EDIT_PRODUCT} className=" text-lime-400 px-4 py-2 hover:underline">
                                    Edit
                                </Link>
                                <button className="font-medium px-4 py-2 text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src="https://phonesstorekenya.com/wp-content/uploads/2024/02/iPhone-16-Pro-Max-a.jpg" className="w-10 md:w-32 max-w-20 max-h-20" alt="iPhone 12"/>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                IPhone 12 
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                1
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Phones
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <button className=" text-lime-400 px-4 py-2 hover:underline">
                                    Edit
                                </button>
                                <button className="font-medium px-4 py-2 text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal bg-black rounded-s-lg px-3 py-2 text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"><span className="font-semibold text-gray-900 dark:text-white">1-10 </span> of <span className="font-semibold text-gray-900 dark:text-white">100</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-zinc-950 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
                    </li>
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</Link>
                    </li>
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                    </li>
                    <li>
                        <Link to='#' aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
                    </li>
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</Link>
                    </li>
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</Link>
                    </li>
                    <li>
                        <Link to='#' className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default MyProducts;

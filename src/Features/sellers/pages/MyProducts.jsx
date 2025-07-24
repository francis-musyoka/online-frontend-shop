import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASEURL, GET_ROUTES_SHOP, PATH_URL, POST_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import { useShopAuth } from '../../../hooks/useAppSelectors';
import axiosShop from '../../../utils/axiosShop';


const MyProducts = () => {

    const [product, setProduct] = useState([]);
    const { showToast } = useToast();
    const { shopIsAuthenticated } = useShopAuth();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axiosShop.get(GET_ROUTES_SHOP.GET_SHOP_PRODUCT);
            if (data.success) {
                setProduct(data.shopProducts)
            }
        };
        if (shopIsAuthenticated) {
            getProducts();
        }

    }, [setProduct, shopIsAuthenticated]);



    const handleDelete = async (productId) => {
        try {
            const response = await axiosShop.post(POST_ROUTES_SHOP.DELETE_PRODUCT(productId));
            if (response.status === 204) {
                showToast('Product delete successfully', 'success')
            }
        } catch (error) {
            showToast(error.response.data.error, 'error')
        };
    };

    return (
        <div>
            {
                product.length > 0 ? (
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
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((product) => (
                                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img src={product.image && product.image.length > 0 ? `${BASEURL}${product.image[0]}` : null} className="w-10 md:w-32 max-w-20 max-h-20" alt="Apple Watch" />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white " >
                                                {product.productName}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.categories.name}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                Ksh  {product.price.toLocaleString()}
                                            </td>
                                            <td className={`${product.status === 'Available' ? 'text-green-400 dark:text-green-300' : product.status === "Out-of-Stock" ? 'text-red-500 dark:text-red-400' : 'text-yellow-500 dark:text-yellow-400'} px-6 py-4 font-semibold`}
                                            >
                                                {product.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={PATH_URL.SELL.EDIT_PRODUCT} state={{ productId: product.id }} className=" text-lime-400 px-4 py-2 hover:underline">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="font-medium px-4 py-2 text-red-600 dark:text-red-500 hover:underline">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                ) : (
                    <h1> No product found</h1>
                )
            }

        </div>
    );
}

export default MyProducts;

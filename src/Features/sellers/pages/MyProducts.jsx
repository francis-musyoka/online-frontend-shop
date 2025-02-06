import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance, BASEURL, GET_ROUTES_SHOP, PATH_URL } from '../../../constant';


const MyProducts = () => {

    const [product,setProduct] = useState([]);
   
    useEffect(()=>{
        const getProducts = async()=>{
            const {data} = await axiosInstance.get(GET_ROUTES_SHOP.GET_SHOP_PRODUCT);
            if(data.success){
                setProduct(data.shopProducts)
            }
            
        };
        getProducts();
    },[setProduct]);

 
  

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
                                    product.map((product)=>(
                                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img src={product.image && product.image.length > 0 ? `${BASEURL}${product.image[0]}` : null} className="w-10 md:w-32 max-w-20 max-h-20" alt="Apple Watch"/>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white " >
                                                {product.productName}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.Category.name}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                Ksh  {product.price.toLocaleString()}
                                            </td>
                                            <td className={ product.quantity ? ' text-green-400' : "text-red-500" `px-6 py-4 font-semibold  dark:text-white`}>
                                                {product.quantity ? 'Avaliable' : "Out Of Stock"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={PATH_URL.SELL.EDIT_PRODUCT} state={{product:product}} className=" text-lime-400 px-4 py-2 hover:underline">
                                                    Edit
                                                </Link>
                                                <button className="font-medium px-4 py-2 text-red-600 dark:text-red-500 hover:underline">
                                                    Remove
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

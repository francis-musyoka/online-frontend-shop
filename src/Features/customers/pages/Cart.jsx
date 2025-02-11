import React, { useEffect, useState } from 'react';
import { HiXMark } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { axiosInstance, BASEURL, GET_ROUTES, PATH_URL } from '../../../constant';
import { useAuth } from '../../../utils/AuthContext';
import { FiChevronRight } from "react-icons/fi";


const Cart = () => {
    const [quantity,setQuantity] = useState(1);
    const [favourite, setFavourite] = useState([]);

    const {token} = useAuth();
    const {showToast} = useAuth();

    const products=[]
    const product = [
       { 
            id:1,
            Image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/8894252/1.jpg?1211",
            quantity:4,
            price: 10000,
            status: 'In stock',
            name:"Hamilton Modern Design Coffee Table With Storage"
        },
        { 
            id:2,
            Image: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/4172072/1.jpg?7272",
            quantity:6,
            price: 7000,
            status: 'In stock',
            name:'Side Tables Nightstand Storage Cabinet'
        },

    //     { 
    //         id:3,
    //         Image: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/47/3153682/1.jpg?6707",
    //         quantity:10,
    //         price: 17000,
    //         status: 'In stock',
    //         name:'Poco C75, 6.88", 128GB + 6GB RAM (Dual SIM)'
    //     },

       ]


    useEffect(()=>{
        if(token){
            try {
                const getProducts = async()=>{
                    const response = await axiosInstance.get(GET_ROUTES.GET_LIMITTED_PRODUCTS_IN_WHISHLIST);
                    if(response.data.success){
                        setFavourite(response.data.myWishlist);
                    }
                }
                getProducts();
            } catch (error) {
                showToast(error.response.data.error );
            }
        };
    },[showToast,token]);

    const handleIncrement =()=>{
        setQuantity(prev=>prev+1)
    };
    const handleDecrement =()=>{
        setQuantity(prev=>prev-1)
    };
    

    return (
        <>
            {products.length > 0 ? (
                <div className="pt-20">
                    <div className="mx-auto max-w-7xl justify-center px-3 md:flex md:space-x-6 xl:px-0">
                        <div className='rounded-lg bg-white p-10 mb-10' >
                            <div className='border-b border-black '>
                                <h3 className="text-3xl font-bold text-gray-900  dark:text-black mb-4">Shopping Cart</h3>
                            </div>
                            {products.map(product=>(
                                <div key={product.id} className="justify-between  border-b border-black mb-2 p-3  sm:flex sm:justify-start">
                                    <img src={product.Image} alt="product-image" className="w-full object-cover  rounded-lg sm:w-40" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                                            <p className="mt-2 text-xs text-blue-500">{product.status}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <p className="text-base  text-center ">KSH {product.price.toLocaleString()}</p>
                                            <div className="flex items-center py-3 space-x-6">
                                                <button className="text-neutral hover:text-secondary">
                                                    <HiXMark size={24} />
                                                </button>
                                                <div className="flex items-center border border-gray-300   rounded-sm overflow-hidden">
                                                    <button 
                                                        onClick={handleDecrement} 
                                                        className="px-3 py-1  duration-100 text-neutral bg-secondary hover:bg-yellow-600 disabled:bg-gray-400 "
                                                        disabled={quantity===1}
                                                        > 
                                                        <HiMinusSm size={24}/>
                                                    </button>
                                                    <input className="h-8 w-8 border bg-white text-center text-lg outline-none"  value={product.quantity}  />
                                                    <button 
                                                        onClick={handleIncrement} 
                                                        className="bg-secondary px-3 py-1 duration-100 text-neutra hover:bg-yellow-600 disabled:bg-gray-400"
                                                        disabled={quantity===product.quantity}
                                                        > 
                                                        <IoAddOutline size={24}/>
                                                    </button>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>  
                            ))}
                        </div>
                        
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">$129.99</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">$4.99</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                                    <p className="text-sm text-gray-700">including VAT</p>
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                        </div>
                    </div>
                </div>
            ):(
            
                <div className="items-center pt-8 px-2 sm:px-10 justify-center">
                    <div className="mx-auto py-9 bg-white rounded-md text-center shadow-md">
                        <h1 className="text-2xl text-neutral font-medium">Nothing here yet!</h1>
                        <p className="text-lg text-gray-700 font-normal my-5">
                        Explore our products and fill your cart with something you love.
                        </p>
                        <div className="mt-5">
                        <Link 
                            to={PATH_URL.HOME} 
                            className="border-2 rounded-md text-blue-950 border-gray-500 px-3 py-2 text-base font-normal bg-yellow-500 hover:bg-black hover:text-white">
                            Start Shopping
                        </Link>
                        </div>
                    </div>
                </div>
               
            )}

            {token &&(
                <>
                    <div className='rounded-lg bg-white mx-2 sm:mx-10 p-9 mt-10 mb-10' >    
                        <div className='border-b border-black flex justify-between'>
                            <h3 className="text-xl font-bold text-gray-900  dark:text-black mb-4">Favourites</h3>
                            {!favourite && favourite.length === 0 (
                                <Link to={PATH_URL.ACCOUNT.FAVOURITES} className="text-lg font-mono text-secondary pr-4 hover:underline">See All</Link>
                            )}
                        </div>
                        {favourite && favourite.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                                {favourite.map((product) => (
                                    <div key={product.productId} className="bg-white border rounded-lg shadow-lg overflow-hidden">
                                        <Link to={`/${product.Product.productName}`} state={{productId:product.productId}} className="bg-white p-4 flex items-center justify-center">
                                        <img
                                            className="w-full h-auto object-contain"
                                            src={product.Product.image && product.Product.image.length > 0 ? `${BASEURL}${product.Product.image[0]}` : null}
                                            alt="product-image"
                                        />
                                        </Link>
                                        <div className="px-5 pb-5">
                                            <Link to={`/${product.Product.productName}`} state={{productId:product.productId}}>
                                                <h5 className="text-xl font-medium tracking-tight dark:text-neutral mb-2 truncate" title={product.Product.productName}>
                                                {product.Product.productName}
                                                </h5>
                                            </Link>

                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-lg font-light text-neutral">
                                                KSH {product.Product.price.toLocaleString()}
                                                </span>

                                                <button 
                                                    className=" rounded-md text-blue-950 0 px-3 py-2 text-base font-normal bg-yellow-500 hover:bg-black hover:text-white">
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ):(<h1 className="text-lg text-gray-700 font-normal my-5"> No items</h1>)}
                    </div>
                </>
            )}
        </>    
    );
}

export default Cart;


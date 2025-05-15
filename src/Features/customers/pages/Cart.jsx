import React, { useEffect, useMemo, useState } from 'react';
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate, } from 'react-router-dom';
import { axiosInstance, BASEURL, GET_ROUTES, PATH_URL, } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';
import { useCartContext } from '../../../context/CartContext';
import CartUpdateButton from '../../../components/CartUpdateButton';
import Button from '../../../components/Button';


const Cart = () => {
    const [favourite, setFavourite] = useState([]);

    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const { removeItem, cartItem, totalQuantity, totalAmount, addToCart } = useCartContext();

    useEffect(() => {
        if (isAuthenticated) {
            try {
                const getProductsInWishlist = async () => {
                    const response = await axiosInstance.get(GET_ROUTES.GET_LIMITTED_PRODUCTS_IN_WHISHLIST);
                    if (response.data.success) {
                        setFavourite(response.data.myWishlist);
                    }
                }
                getProductsInWishlist();

            } catch (error) {
                showToast(error.response.data.error);
            }
        };
    }, [showToast, isAuthenticated]);

    const filteredFavourite = useMemo(() =>
        favourite.filter(favItems =>
            !cartItem.some(cartItem => cartItem.productId === favItems.productId)
        ),
        [favourite, cartItem]
    );

    const handleCheckOutButton = () => {
        if (isAuthenticated) {
            navigate(PATH_URL.CHECK_OUT);
        } else {
            navigate(PATH_URL.SIGN_IN);
        }
    }

    return (
        <>
            {cartItem.length > 0 ? (
                <div className="pt-20">
                    <div className="mx-auto max-w-7xl justify-center px-3 md:flex md:space-x-6 xl:px-0">
                        <div className='rounded-lg bg-white p-10 mb-10' >
                            <div className='border-b border-black '>
                                <h3 className="text-3xl font-bold text-gray-900  dark:text-black mb-4">Shopping Cart</h3>
                            </div>
                            {cartItem.map(product => (

                                <div key={product.productId} className="justify-between  border-b border-black mb-2 p-3  sm:flex sm:justify-start">
                                    <img src={product.product.image && product.product.image.length > 0 ? `${BASEURL}${product.product.image[0]}` : null}
                                        alt="product-image" className="w-full object-cover  rounded-lg sm:w-40" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <Link to={`/${product.product.productName}`} state={{ productId: product.productId }} className="text-lg font-bold text-gray-900">{product.product.productName}</Link>
                                            <p className="mt-2 text-xs text-blue-500">{product.product.status}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <p className="text-base  text-center ">KSH {product.product.price.toLocaleString()}</p>
                                            <div className="flex items-center py-3 space-x-6">
                                                <button onClick={() => removeItem(product.productId)} className="text-neutral hover:text-secondary">
                                                    <HiXMark size={24} />
                                                </button>
                                                <CartUpdateButton productId={product.productId} quantity={product.quantity} productQuantity={product.product.quantity} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">items ({totalQuantity})</p>
                                <p className="text-gray-700">KSH {totalAmount.toLocaleString()}</p>
                            </div>
                            {/* <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">Ksh: 500</p>
                            </div> */}
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">KSH {totalAmount.toLocaleString()}</p>
                                    {/* <p className="text-sm text-gray-700">including VAT</p> */}
                                </div>
                            </div>
                            <button
                                onClick={handleCheckOutButton}
                                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                            >
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (

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

            {isAuthenticated && filteredFavourite.length > 0 ? (
                <>
                    <div className='rounded-lg bg-white mx-2 sm:mx-10 p-9 mt-10 mb-10' >
                        <div className='border-b border-black flex justify-between'>
                            <h3 className="text-xl font-bold text-gray-900  dark:text-black mb-4">Favourites</h3>
                            <Link to={PATH_URL.ACCOUNT.FAVOURITES} className="text-lg font-mono text-secondary pr-4 hover:underline">See All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                            {filteredFavourite.map((product) => (
                                <div key={product.productId} className="bg-white border rounded-lg shadow-lg overflow-hidden">
                                    <Link to={`/${product.product.productName}`} state={{ productId: product.productId }} className="bg-white p-4 flex items-center justify-center">
                                        <img
                                            className="w-full h-auto object-contain"
                                            src={product.product.image && product.product.image.length > 0 ? `${BASEURL}${product.product.image[0]}` : null}
                                            alt="product-image"
                                        />
                                    </Link>
                                    <div className="px-5 pb-5">
                                        <Link to={`/${product.product.productName}`} state={{ productId: product.productId }}>
                                            <h5 className="text-xl font-medium tracking-tight dark:text-neutral mb-2 truncate" title={product.product.productName}>
                                                {product.product.productName}
                                            </h5>
                                        </Link>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm font-normal text-gray-900">
                                                KSH {product.product.price.toLocaleString()}
                                            </span>

                                            <Button label="Add to Cart" variant="secondary" size="small" onClick={() => addToCart(product.productId)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </>
            ) : (<></>)}
        </>
    );
}

export default Cart;


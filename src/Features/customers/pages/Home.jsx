import { useEffect, useState } from 'react';
import { BASEURL, GET_ROUTES } from '../../../constant';
import CartUpdateButton from '../../../components/CartUpdateButton';
import Spinning from '../../../components/Spinning';
import { useCart, useCustomerAuth, useSearchQuery } from '../../../hooks/useAppSelectors';
import { addTocart } from '../../../redux/actionsCreators/cartAction';
import { useDispatch } from 'react-redux';
import axiosCustomer from '../../../utils/axiosCustomer';
import { Link } from 'react-router-dom';
import WishlistButton from '../../../components/WishlistButton';
import Pagination from '../component/pagination';


const Home = () => {
    const { searchResults, loading } = useSearchQuery();
    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const { cartItem } = useCart();
    const { isAuthenticated } = useCustomerAuth();

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axiosCustomer.get(GET_ROUTES.GET_ALL_PRODUCTS);
                if (response.data?.success) {
                    setProduct(response.data.products)
                }
            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false)
            }

        };
        fetchProducts();

    }, [setProduct]);

    const handleClick = async (productId) => {
        dispatch(addTocart(isAuthenticated, productId));
    };

    const isAnyLoading = isLoading || loading;

    return (
        <div div className="relative min-h-screen">
            {isAnyLoading ? (<Spinning />) : (
                <>
                    {searchResults && searchResults.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
                            {searchResults.map((product) => {
                                const cartProduct = cartItem.find(item => item.productId === product.id);
                                const discountNum = Number(product.discount);
                                const discountPrice = discountNum > 0 ? Math.floor((discountNum / 100) * product.price) : 0;
                                const productPrice = product.price - discountPrice;
                                return (
                                    <div className="w-full sm:w-60 bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300 ">
                                        <Link to={`/${product.id}/${product.productName}`} className="relative flex justify-center">
                                            <img
                                                src={product.image && product.image.length > 0 ? `${BASEURL}${product.image[0]}` : null}
                                                alt={product.productName || 'Product Image'}
                                                className="w-40 h-30 object-cover"
                                            />
                                            {discountNum > 0 && (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                {discountNum % 1 === 0 ? discountNum : discountNum.toFixed(2)}% OFF
                                            </span>)}

                                        </Link>
                                        <div className="p-3 flex flex-col gap-2">

                                            <Link to={`/${product.id}/${product.productName}`} className="text-sm font-medium truncate" title={product.productName}>
                                                {product.productName}
                                            </Link>

                                            <span className="text-xs text-gray-500">Category: <Link to={'#'} className='ml-2 text-secondary hover:underline'>{product.categories.name}</Link>  </span>
                                            {/* <div className="flex items-center text-yellow-500 text-sm gap-1">
                                            ★★★★☆
                                            <span className="text-xs text-gray-500">(120)</span>
                                        </div> */}

                                            <Link to={`/${product.id}/${product.productName}`} className="flex items-center justify-between">
                                                <span className="text-black text-xs sm:text-sm md:text-base">
                                                    KSH {productPrice.toLocaleString()}
                                                </span>

                                                {discountNum > 0 && <span className="text-xs line-through text-gray-400">KSH {product.price}</span>}

                                            </Link>
                                            <p className={`text-xs ${product.status === "Available" ? "text-green-400" : product.status === "Coming-Soon" ? "text-yellow-500" : "text-red-400"}`}>{product.status}</p>
                                            <div className="flex justify-between mt-2">
                                                {cartItem.some(items => items.productId === product.id) ? (
                                                    <CartUpdateButton productId={product.id} quantity={cartProduct.quantity} productQuantity={product.quantity} />
                                                ) : (
                                                    <button onClick={() => handleClick(product.id)} disabled={product.status !== "Available"} className="bg-primary hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm disabled:bg-gray-300">
                                                        Add to Cart
                                                    </button>
                                                )}
                                                <div>
                                                    <WishlistButton productId={product?.id} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    ) : (
                        product && product.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                                {product.map((product) => {
                                    const cartProduct = cartItem.find(item => item.productId === product.id);
                                    const discountNum = Number(product.discount);
                                    const discountPrice = discountNum > 0 ? Math.floor((discountNum / 100) * product.price) : 0;
                                    const productPrice = product.price - discountPrice;
                                    return (
                                        <div className="w-full sm:w-60 bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
                                            <Link to={`/${product.id}/${product.productName}`} className="relative flex justify-center">
                                                <img
                                                    src={product.image && product.image.length > 0 ? `${BASEURL}${product.image[0]}` : null}
                                                    alt={product.productName || 'Product Image'}
                                                    className="w-40 h-30 object-cover"
                                                />
                                                {discountNum > 0 && (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                    {discountNum % 1 === 0 ? discountNum : discountNum.toFixed(2)}% OFF
                                                </span>)}

                                            </Link>
                                            <div className="p-3 flex flex-col gap-2">

                                                <Link to={`/${product.id}/${product.productName}`} className="text-sm font-medium truncate" title={product.productName}>
                                                    {product.productName}
                                                </Link>

                                                <span className="text-xs text-gray-500">Category: <Link to={'#'} className='ml-2 text-secondary hover:underline'>{product.categories.name}</Link>  </span>
                                                {/* <div className="flex items-center text-yellow-500 text-sm gap-1">
                                            ★★★★☆
                                            <span className="text-xs text-gray-500">(120)</span>
                                        </div> */}

                                                <Link to={`/${product.id}/${product.productName}`} className="flex items-center justify-between">
                                                    <span className="text-black text-xs sm:text-sm md:text-base">
                                                        KSH {productPrice.toLocaleString()}
                                                    </span>

                                                    {discountNum > 0 && <span className="text-xs line-through text-gray-400">KSH {product.price}</span>}

                                                </Link>
                                                <p className={`text-xs ${product.status === "Available" ? "text-green-400" : product.status === "Coming-Soon" ? "text-yellow-500" : "text-red-400"}`}>{product.status}</p>
                                                <div className="flex justify-between mt-2">
                                                    {cartItem.some(items => items.productId === product.id) ? (
                                                        <CartUpdateButton productId={product.id} quantity={cartProduct.quantity} productQuantity={product.quantity} />
                                                    ) : (
                                                        <button onClick={() => handleClick(product.id)} disabled={product.status !== "Available"} className="bg-primary hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm disabled:bg-gray-300">
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                    <div>
                                                        <WishlistButton productId={product?.id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        ) : (
                            <h1 className="text-neutral m-10 text-center">No products</h1>
                        )
                    )

                    }

                </>
            )}
            <div className="absolute bottom-4 left-0 w-full">
                <Pagination />
            </div>


        </div>
    );
}

export default Home;

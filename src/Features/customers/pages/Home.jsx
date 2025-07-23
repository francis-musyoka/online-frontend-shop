import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { axiosInstance, BASEURL, GET_ROUTES } from '../../../constant';
import CartUpdateButton from '../../../components/CartUpdateButton';
import Spinning from '../../../components/Spinning';
import { useCart, useCustomerAuth } from '../../../hooks/useAppSelectors';
import { addTocart, fetchCart } from '../../../redux/actionsCreators/cartAction';
import { useDispatch } from 'react-redux';

let fetched = false;

const Home = () => {

    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const { cartItem } = useCart();
    const { isAuthenticated } = useCustomerAuth();
    const guestId = localStorage.getItem("guestId");

    useEffect(() => {
        if (!fetched) {
            dispatch(fetchCart(isAuthenticated, guestId));
            fetched = true
        }
    }, [dispatch, guestId, isAuthenticated]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axiosInstance.get(GET_ROUTES.GET_ALL_PRODUCTS);
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

    return (
        <>
            {isLoading ? (<Spinning />) : (
                <>
                    {product && product.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-2 p-2">
                            {product.map((product) => {
                                const cartProduct = cartItem.find(item => item.productId === product.id);
                                return (
                                    <div key={product.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">

                                        <Link to={`/${product.productName}`} state={{ productId: product.id }} className="bg-white flex items-center justify-center">
                                            <img
                                                className="w-50 h-40"
                                                src={product.image && product.image.length > 0 ? `${BASEURL}${product.image[0]}` : null}
                                                alt={product.productName || 'Product Image'}
                                            />
                                        </Link>
                                        <div className="px-4 pb-2">
                                            <Link to={`/${product.productName}`} state={{ productId: product.id }}>
                                                <h5 className="text-sm font-medium tracking-tight dark:text-neutral truncate" title={product.productName}>
                                                    {product.productName}
                                                </h5>
                                            </Link>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-light text-neutral">
                                                    KSH {product.price.toLocaleString()}
                                                </span>

                                                {cartItem.some(items => items.productId === product.id) ? (
                                                    <CartUpdateButton productId={product.id} quantity={cartProduct.quantity} productQuantity={product.quantity} />
                                                ) : (
                                                    <Button label="Add to Cart" variant="primary" size="medium" onClick={() => handleClick(product.id)} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <h1 className="text-neutral m-10 text-center">No products</h1>
                    )}
                </>
            )}

        </>
    );
}

export default Home;

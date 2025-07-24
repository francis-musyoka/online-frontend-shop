import { useEffect, useState } from 'react';
import { BASEURL, GET_ROUTES } from '../../../../constant';
import WishlistButton from '../../../../components/WishlistButton';
import { useToast } from '../../../../context/ToastContext';
import axiosCustomer from '../../../../utils/axiosCustomer';

const Favourite = () => {
    const [products, setProducts] = useState([]);

    const { showToast } = useToast();

    useEffect(() => {
        try {
            const getProducts = async () => {
                const response = await axiosCustomer.get(GET_ROUTES.GET_PRODUCTS_IN_WISHLIST);
                if (response.data.success) {
                    setProducts(response.data.myWishlist);
                }
            }
            getProducts();
        } catch (error) {
            showToast(error.response.data.error);
        }

    }, [showToast]);

    return (
        <div>

            <h3 className="text-4xl font-bold text-gray-900 dark:text-black mb-2 m-8">My Favourites</h3>

            <div className="bg-tertiary p-4 rounded shadow">
                {products.length > 0 ? (products.map(product => (
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center p-4 border rounded-lg">
                            <img
                                src={`${BASEURL}${product.product.image[0]}`}
                                alt="Product"
                                className="w-20 h-20 object-cover rounded sm:mr-4"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold ">
                                    {product.product.productName}
                                </h3>
                                <p className="text-base font-medium mt-2 text-gray-900">KSh {product.product.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                                <button className=" text-neutral px-4 py-2 border border-secondary">Buy Now</button>
                                <WishlistButton productId={product.productId} />
                            </div>
                        </div>
                    </div>
                ))) : (
                    <h1 className='text-neutral'> No items</h1>
                )}

            </div>

        </div>
    );
}

export default Favourite;

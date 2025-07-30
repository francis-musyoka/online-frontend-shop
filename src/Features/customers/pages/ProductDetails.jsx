import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { BASEURL, GET_ROUTES } from '../../../constant';
import WishlistButton from '../../../components/WishlistButton';
import DisplayDescription from '../component/DescriptionEditor';
import KeyFeaturesDisplay from '../component/KeyFeatursEditor';
import CartUpdateButton from '../../../components/CartUpdateButton';
import { useCart, useCustomerAuth } from '../../../hooks/useAppSelectors';
import { addTocart } from '../../../redux/actionsCreators/cartAction';
import { useDispatch } from 'react-redux';
import axiosCustomer from '../../../utils/axiosCustomer';
import Spinning from '../../../components/Spinning';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const { cartItem } = useCart();
    const { isAuthenticated } = useCustomerAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        const getProductDetails = async () => {
            try {
                const response = await axiosCustomer.get(GET_ROUTES.GET_SINGLE_PRODUCT(productId));
                if (response.data.success && isMounted) {
                    setProduct(response.data.productDetail);
                    setSelectedImage(response.data.productDetail.image?.[0] || null);
                }
            } catch (error) {
                // Optionally handle error
            }
        };
        getProductDetails();
        return () => { isMounted = false; };
    }, [productId]);

    const cartProduct = useMemo(
        () => cartItem?.find(item => item.productId === productId),
        [cartItem, productId]
    );

    const handleAddToCart = useCallback(() => {
        if (isAuthenticated && productId) {
            dispatch(addTocart(isAuthenticated, productId));
        }
    }, [dispatch, isAuthenticated, productId]);

    const handleImageSelect = useCallback((img) => {
        setSelectedImage(img);
    }, []);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-96">
                <Spinning />
            </div>
        );
    }
    return (
        <div>
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-11 bg-white border rounded-lg shadow-sm">
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img
                                            className="h-full w-full max-w-full object-cover"
                                            src={selectedImage ? `${BASEURL}${selectedImage}` : ''}
                                            alt="Product"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        {product.image?.map((img, index) => (
                                            <button
                                                key={img}
                                                type="button"
                                                onClick={() => handleImageSelect(img)}
                                                className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${selectedImage === img ? 'border-gray-900' : 'border-transparent'}`}
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={`${BASEURL}${img}`}
                                                    alt={`Thumbnail ${index + 1}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 order-last sm:order-last md:order-first">
                            <div className="flex items-center justify-between">
                                <h1 className="text-base font-bold text-gray-900 lg:text-base">{product.productName}</h1>
                                <WishlistButton productId={product.id} />
                            </div>
                            <div className="mt-5 flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-700">Brand:</span>
                                <Link className="text-sm font-medium text-primary hover:underline">{product.brand}</Link>
                            </div>
                            <div className="mt-10 flex flex-row items-center justify-between border-t border-b py-4 sm:space-x-4 sm:w-full">
                                <div className="flex items-end">
                                    <h1 className="text-base font-medium ">KSH {product.price?.toLocaleString()}</h1>
                                </div>
                                {cartProduct ? (
                                    <CartUpdateButton
                                        productId={product.id}
                                        quantity={cartProduct.quantity}
                                        productQuantity={product.quantity}
                                    />
                                ) : (
                                    <Button
                                        label="Add to Cart"
                                        variant="primary"
                                        size="medium"
                                        onClick={handleAddToCart}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mx-auto mb-7 px-11 bg-white border rounded-lg shadow-sm">
                <div className="m-5">
                    <div className="flex gap-10 border-b border-gray-300">
                        <h1 className="py-4 text-lg font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                            Description
                        </h1>
                    </div>
                    <div className="mt-2 flow-root sm:mt-12 text-sm">
                        {product.description && <DisplayDescription description={product.description} />}
                    </div>
                    <div className="border-b border-gray-300 mt-6">
                        <h1 className="py-4 text-lg font-medium text-gray-900 hover:text-gray-800">
                            Key Features
                        </h1>
                    </div>
                    <div className="mt-1 flow-root sm:mt-12 list-disc pl-5 text-gray-700 text-sm">
                        {product.keyFeatures && <KeyFeaturesDisplay keyFeatures={product.keyFeatures} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
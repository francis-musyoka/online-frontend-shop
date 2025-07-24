import { useEffect, useState } from 'react';
import { POST_ROUTES, GET_ROUTES, PATH_URL } from '../constant';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useCustomerAuth } from '../hooks/useAppSelectors';
import axiosCustomer from '../utils/axiosCustomer';

const WishlistButton = ({ productId }) => {
    const [isWishlisted, setIsWishlisted] = useState(null);

    const { isAuthenticated } = useCustomerAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const checkStatus = async () => {
                const response = await axiosCustomer.get(GET_ROUTES.ChECK_IS_IN_WISHLIST(productId));
                if (response.data.success) {
                    setIsWishlisted(response.data.isInWishlist)
                }
            }
            checkStatus();
        }
    }, [isAuthenticated, productId]);


    const handleWishlistClick = async () => {
        if (isAuthenticated) {
            try {
                const response = await axiosCustomer.post(POST_ROUTES.ADD_AND_REMOVE_WISHLIST(productId));
                if (response.data.success) {
                    setIsWishlisted((prev) => !prev);
                    showToast(response.data.message, 'success');
                }
            } catch (error) {
                showToast(error.response.data.error, 'error');
            }
        } else {
            navigate(PATH_URL.SIGN_IN);
        }
    }
    return (
        <div>
            <button onClick={handleWishlistClick} className="text-secondary text-3xl">
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    );
}

export default WishlistButton;

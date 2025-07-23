
import React from 'react';
import { HiMinusSm } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { updateCartQuantity } from '../redux/actionsCreators/cartAction';
import { useDispatch } from 'react-redux';
import { useCustomerAuth } from '../hooks/useAppSelectors';


const CartUpdateButton = (props) => {
    const { productId, quantity, productQuantity } = props;
    const dispatch = useDispatch();
    const { isAuthenticated } = useCustomerAuth();
    const guestId = localStorage.getItem('guestId') || null;

    const updateQuantity = (newQuantity) => {
        dispatch(updateCartQuantity(isAuthenticated, guestId, productId, newQuantity));
    }

    return (
        <div className="flex items-center overflow-hidden">
            <button
                onClick={() => updateQuantity(quantity - 1)}
                className="px-2 py-1 rounded-md duration-100 text-neutral bg-secondary hover:bg-yellow-600 disabled:bg-gray-400 "
            >
                <HiMinusSm size={20} />
            </button>
            <span className="px-2 py-1  bg-white text-center text-lg outline-none">{quantity}</span>
            <button
                onClick={() => updateQuantity(quantity + 1)}
                className="bg-secondary px-2 rounded-md py-1 duration-100 text-neutra hover:bg-yellow-600 disabled:bg-gray-400"
                disabled={productQuantity === quantity}
            >
                <IoAddOutline size={20} />
            </button>
        </div>
    );
}

export default CartUpdateButton;

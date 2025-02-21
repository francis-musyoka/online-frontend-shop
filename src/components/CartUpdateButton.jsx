
import React from 'react';
import { HiMinusSm } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { useCartContext } from '../context/CartContext';

const CartUpdateButton = (props) => {
    const {productId,quantity,productQuantity} = props;

    const {UpdateCartQuantity} = useCartContext();

    return (
        <div className="flex items-center border border-gray-300   rounded-sm overflow-hidden">
             <button 
                onClick={()=>UpdateCartQuantity(productId, quantity-1)}
                className="px-3 py-1  duration-100 text-neutral bg-secondary hover:bg-yellow-600 disabled:bg-gray-400 "
                > 
                <HiMinusSm size={24}/>
            </button>
            <input className="h-8 w-8 border bg-white text-center text-lg outline-none"  value={quantity}  />
            <button 
                onClick={()=>UpdateCartQuantity(productId, quantity+1)}
                className="bg-secondary px-3 py-1 duration-100 text-neutra hover:bg-yellow-600 disabled:bg-gray-400"
                disabled={productQuantity===quantity}
                > 
                <IoAddOutline size={24}/>
            </button>
        </div>
    );
}

export default CartUpdateButton;

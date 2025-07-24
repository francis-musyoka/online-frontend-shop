import { GET_ROUTES, POST_ROUTES, PATCH_ROUTES } from "../../constant";
import { replaceCart, cartError, updateQuantity, removeItem } from "../slices/cartSlice";
import { createGuestId } from "../../utils";
import axiosCustomer from "../../utils/axiosCustomer";

export const fetchCart = (isAuthenticated, guestId) => {

    return async (dispatch) => {
        try {
            let response;
            if (isAuthenticated) {
                response = await axiosCustomer.get(GET_ROUTES.GET_CART);
            } else if (guestId) {
                // Fetch guest cart
                response = await axiosCustomer.get(GET_ROUTES.GET_GUEST_CART(guestId));
            };
            if (response?.data?.success) {
                const items = response.data.cartItems;
                const totalQuantity = response.data.cartItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = response.data.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                dispatch(replaceCart({
                    cart: items,
                    totalQuantity,
                    totalAmount,
                }));
            };

        } catch (error) {
            dispatch(cartError(error.response?.data?.error || "Fetching cart failed"));
        };
    };
};


export const addTocart = (isAuthenticated, productId) => {

    return async (dispatch) => {
        try {
            const guestId = createGuestId();
            let response;
            if (isAuthenticated) {
                response = await axiosCustomer.post(POST_ROUTES.ADD_PRODUCT_TO_CART(productId));

            } else {
                response = await axiosCustomer.post(POST_ROUTES.ADD_PRODUCT_TO_GUEST_CART, { productId: productId, guestId });
            }
            if (response.data.success) {
                dispatch(fetchCart(isAuthenticated, guestId));
            }
        } catch (error) {
            dispatch(cartError(error.response?.data?.error || "Failed to add to cart "));
        }

    };
};


export const updateCartQuantity = (isAuthenticated, guestId, productId, newQuantity) => {

    return async (dispatch) => {
        try {
            if (newQuantity === 0) {
                dispatch(removeCartItem(isAuthenticated, guestId, productId));
                return;
            }
            if (isAuthenticated) {
                await axiosCustomer.patch(PATCH_ROUTES.UPDATE_CART_QUANTITY(productId), { newQuantity });
            } else if (guestId) {
                await axiosCustomer.patch(PATCH_ROUTES.UPDATE_GUEST_CART_QUANTITY(productId), { newQuantity, guestId });
            }

            dispatch(updateQuantity({ productId, newQuantity }));

        } catch (error) {
            dispatch(cartError(error.response?.data?.error || "Failed to update cart quantity"));;
        }
    }
}


export const removeCartItem = (isAuthenticated, guestId, productId) => {
    return async (dispatch) => {
        try {
            if (isAuthenticated) {
                await axiosCustomer.post(POST_ROUTES.DELETE_PRODUCT_FROM_CART(productId));
            } else {
                await axiosCustomer.post(POST_ROUTES.DELETE_PRODUCT_FROM_GUEST_CART(productId), {
                    guestId,
                });
            }
            dispatch(removeItem(productId));
        } catch (error) {
            dispatch(cartError(error.response?.data?.error || "Failed to remove item"));
        }
    };
};
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: [],
        totalQuantity: 0,
        totalAmount: 0,
        error: null
    },

    reducers: {
        replaceCart(state, action) {
            state.cartItem = action.payload.cart;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
            state.error = null
        },
        updateQuantity(state, action) {
            const { productId, newQuantity } = action.payload;
            state.cartItem = state.cartItem.map((product) =>
                product.productId === productId
                    ? { ...product, quantity: newQuantity }
                    : product
            );
            state.totalQuantity = state.cartItem.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = state.cartItem.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        },
        removeItem(state, action) {
            const productId = action.payload;
            state.cartItem = state.cartItem.filter(
                (item) => item.productId !== productId
            );
            state.totalQuantity = state.cartItem.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = state.cartItem.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        },
        cartError(state, action) {
            state.error = action.payload
        }
    }



})
export const { replaceCart, cartError, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
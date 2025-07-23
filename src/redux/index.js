import { configureStore } from "@reduxjs/toolkit";
import customerAuthReducer from "./slices/customerAuthSlice";
import shopAuthReducer from "./slices/shopAuthslice";
import cartReducer from "./slices/cartSlice"

export default configureStore({
    reducer: {
        customerAuth: customerAuthReducer,
        shopAuth: shopAuthReducer,
        cart: cartReducer
    }
})
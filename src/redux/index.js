import { configureStore } from "@reduxjs/toolkit";
import customerAuthReducer from "./slices/customerAuthSlice";
import shopAuthReducer from "./slices/shopAuthslice";
import cartReducer from "./slices/cartSlice"
import searchQueryReducer from "./slices/searchQuery";

export default configureStore({
    reducer: {
        customerAuth: customerAuthReducer,
        shopAuth: shopAuthReducer,
        cart: cartReducer,
        searchQuery: searchQueryReducer
    }
})
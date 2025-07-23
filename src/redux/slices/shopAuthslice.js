
import { createSlice } from "@reduxjs/toolkit";


const shopAuthSlice = createSlice({
    name: "shopAuth",
    initialState: {
        shopProfile: null,
        shopIsAuthenticated: JSON.parse(localStorage.getItem('shopAuth')) || false,
        error: null,
    },
    reducers: {
        shopLoginSuccess(state,) {
            state.shopIsAuthenticated = true;
            state.error = null;
        },
        shopLogoutSuccess(state) {
            state.shopIsAuthenticated = false;
            state.shopProfile = null;
            state.error = null;
        },
        shopProfile(state, action) {
            state.shopProfile = action.payload.shopProfile;
            state.shopIsAuthenticated = action.payload.isAuthenticated;
        },
        shopError(state, action) {
            state.error = action.payload;
        },


    }
})

export const { shopLoginSuccess, shopLogoutSuccess, shopProfile, shopError } = shopAuthSlice.actions;

export default shopAuthSlice.reducer;



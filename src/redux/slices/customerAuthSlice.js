
import { createSlice } from "@reduxjs/toolkit";


const customerAuthSlice = createSlice({
    name: "customerAuth",
    initialState: {
        user: null,
        isAuthenticated: JSON.parse(localStorage.getItem('auth')) || false,
        error: null,
    },
    reducers: {
        loginSuccess(state,) {
            state.isAuthenticated = true;
            state.error = null;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        userProfile(state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        authError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },

    }
})

export const { loginSuccess, logoutSuccess, userProfile, clearError, authError } = customerAuthSlice.actions;

export default customerAuthSlice.reducer;



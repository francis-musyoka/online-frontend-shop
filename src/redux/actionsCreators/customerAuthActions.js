import { loginSuccess, logoutSuccess, userProfile, authError } from "../slices/customerAuthSlice";
import { GET_ROUTES, POST_ROUTES } from '../../constant';
import axiosCustomer from "../../utils/axiosCustomer";
import { clearCart } from "../slices/cartSlice";
import { fetchCart } from "./cartAction";

export const logInAction = (email, password) => {
    return async (dispatch) => {
        const guestId = localStorage.getItem('guestId') || null;

        try {
            const response = await axiosCustomer.post(`${POST_ROUTES.SIGN_IN}`, {
                email,
                password,
                guestId
            });

            if (response.data.success) {
                localStorage.setItem('auth', JSON.stringify(true));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                dispatch(loginSuccess());

                //  After login, fetch user profile
                await dispatch(fetchUserProfile());

                //  Then fetch user's cart
                const isAuthenticated = true; // since login succeeded
                dispatch(fetchCart(isAuthenticated, guestId))

            };

        } catch (error) {
            console.log(error);
            dispatch(authError(error.response?.data?.error || "Sign in failed"));
        };
    };
};

export const logOutAction = () => {
    return async (dispatch) => {
        try {
            const response = await axiosCustomer.get(`${GET_ROUTES.LOGOUT}`);
            if (response.data.success) {
                localStorage.removeItem("auth");
                localStorage.removeItem("token");
                dispatch(logoutSuccess());
                dispatch(clearCart());
            };
        } catch (error) {
            dispatch(authError(error.response?.data?.error || "Log out failed"))
        }

    };
};


export const fetchUserProfile = () => {
    return async (dispatch) => {
        try {
            const response = await axiosCustomer.get(`${GET_ROUTES.GET_USER_PROFILE}`);

            if (response.data.authenticated) {
                dispatch(userProfile({
                    user: response.data.user,
                    isAuthenticated: response.data.authenticated
                }));

            } else {
                localStorage.removeItem("auth");
                localStorage.removeItem("token");
                dispatch(logoutSuccess());
            }
        } catch (error) {
            localStorage.removeItem("auth");
            localStorage.removeItem("token");
            dispatch(logoutSuccess());
        }
    }
}
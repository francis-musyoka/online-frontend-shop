import { loginSuccess, logoutSuccess, userProfile, authError } from "../slices/customerAuthSlice";
import { axiosInstance, GET_ROUTES, POST_ROUTES } from '../../constant';

export const logInAction = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.SIGN_IN}`, {
                email,
                password,
                guestId: localStorage.getItem('guestId') || null,
            });

            if (response.data.success) {
                localStorage.setItem('auth', JSON.stringify(true));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                dispatch(loginSuccess());

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
            const response = await axiosInstance.get(`${GET_ROUTES.LOGOUT}`);
            if (response.data.success) {
                localStorage.removeItem("auth");
                localStorage.removeItem("token");
                dispatch(logoutSuccess());
            };
        } catch (error) {
            dispatch(authError(error.response?.data?.error || "Log out failed"))
        }

    };
};


export const fetchUserProfile = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(`${GET_ROUTES.GET_USER_PROFILE}`);

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
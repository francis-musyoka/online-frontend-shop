import { shopError, shopLogoutSuccess, shopProfile, shopLoginSuccess } from "../slices/shopAuthslice";
import { GET_ROUTES_SHOP, POST_ROUTES_SHOP } from '../../constant';
import axiosShop from "../../utils/axiosShop";

export const shopLogInAction = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axiosShop.post(`${POST_ROUTES_SHOP.LOG_IN}`, { formData });

            if (response.data.success) {
                localStorage.setItem('shopAuth', JSON.stringify(true));
                localStorage.setItem('shopToken', JSON.stringify(response.data.token));
                dispatch(shopLoginSuccess());

            };

        } catch (error) {
            dispatch(shopError(error.response?.data?.error || "Log in failed"));
        };
    };
};

export const shopLogOutAction = () => {
    return async (dispatch) => {
        try {
            const response = await axiosShop.post(`${POST_ROUTES_SHOP.LOG_OUT}`);
            if (response.data.success) {
                localStorage.removeItem("shopAuth");
                localStorage.removeItem("shopToken");
                dispatch(shopLogoutSuccess());
            };
        } catch (error) {
            console.log(error);

            dispatch(shopError(error.response?.data?.error || "Log out failed"))
        }

    };
};


export const fetchShopProfile = () => {
    return async (dispatch) => {
        try {
            const response = await axiosShop.get(`${GET_ROUTES_SHOP.GET_SHOP_PROFILE}`);

            if (response.data.authenticated) {
                dispatch(shopProfile({
                    shopProfile: response.data.shopProfile,
                    isAuthenticated: response.data.authenticated
                }));

            } else {
                localStorage.removeItem("shopAuth");
                localStorage.removeItem("shopToken");
                dispatch(shopLogoutSuccess());
            }
        } catch (error) {
            localStorage.removeItem("shopAuth");
            localStorage.removeItem("shopToken");
            dispatch(shopLogoutSuccess());
        }
    }
}
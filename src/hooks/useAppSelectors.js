import { useSelector } from 'react-redux';

export const useCustomerAuth = () => {
    const isAuthenticated = useSelector((state) => state.customerAuth.isAuthenticated);
    const user = useSelector((state) => state.customerAuth.user);
    const error = useSelector((state) => state.customerAuth.error);
    return { isAuthenticated, user, error };
};

export const useShopAuth = () => {
    const shopIsAuthenticated = useSelector((state) => state.shopAuth.shopIsAuthenticated);
    const shopProfile = useSelector((state) => state.shopAuth.shopProfile);
    const error = useSelector((state) => state.shopAuth.error);
    return { shopIsAuthenticated, shopProfile, error };
};

export const useCart = () => {
    const cartItem = useSelector((state) => state.cart.cartItem);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const error = useSelector((state) => state.cart.error);
    return { cartItem, totalQuantity, totalAmount, error };
};
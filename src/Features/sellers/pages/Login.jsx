import { useEffect } from 'react';
import SignInForm from '../../../components/SignInForm';
import { useShopAuth } from '../../../hooks/useAppSelectors';
import { shopLogInAction } from '../../../redux/actionsCreators/shopAuthActions';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';


const SignIn = () => {
    const { error, shopIsAuthenticated } = useShopAuth();

    const dispatch = useDispatch()
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        dispatch(shopLogInAction(formData));
    }

    useEffect(() => {
        if (error) {
            showToast(error, "error");
        }
    }, [error, showToast]);

    useEffect(() => {
        if (shopIsAuthenticated) {
            navigate(PATH_URL.SELL.MY_PRODUCTS)
        }
    }, [navigate, shopIsAuthenticated]);

    return (
        <>
            <SignInForm onSubmit={handleSubmit} isSeller={true} />
        </>
    );
}

export default SignIn;

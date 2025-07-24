
import { useEffect } from 'react';
import SignInForm from '../../../components/SignInForm';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../context/ToastContext';
import { useNavigate, } from 'react-router-dom';
import { useCustomerAuth } from '../../../hooks/useAppSelectors';
import { logInAction } from '../../../redux/actionsCreators/customerAuthActions';
import { PATH_URL } from '../../../constant';

const SignIn = () => {
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useCustomerAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        const { email, password } = formData;
        dispatch(logInAction(email, password));
    }

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error, showToast]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(PATH_URL.ACCOUNT.BASE);
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <SignInForm onSubmit={handleSubmit} isSeller={false} />
        </>
    );
}

export default SignIn;

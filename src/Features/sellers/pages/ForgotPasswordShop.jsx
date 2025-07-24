import { useNavigate } from 'react-router-dom';
import { PATH_URL, POST_ROUTES_SHOP } from '../../../constant';
import ForgotPasswordForm from '../../../components/ForgotPasswordForm';
import { useToast } from '../../../context/ToastContext';
import axiosShop from '../../../utils/axiosShop';

const ForgotPasswordShop = () => {

    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (email) => {
        try {
            const response = await axiosShop.post(`${POST_ROUTES_SHOP.FORGOT_PASSWORD}`, { email });
            if (response.data.success) {
                showToast("A password reset link will be sent to this email if an account is registered under it.", 'success');
                navigate(PATH_URL.SELL.LOG_IN);
            }
        } catch (error) {
            if (error) {
                showToast("A password reset link will be sent to this email if an account is registered under it.", 'success')
                navigate(PATH_URL.SELL.LOG_IN);
            }
        }
    }

    return (
        <div>
            <ForgotPasswordForm isSeller={true} onSubmitHandler={handleSubmit} />
        </div>
    );
}

export default ForgotPasswordShop;

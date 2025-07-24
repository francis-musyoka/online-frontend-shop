import ResetPasswordForm from '../../components/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_URL, POST_ROUTES_SHOP } from '../../constant';
import { useToast } from '../../context/ToastContext';
import axiosShop from '../../utils/axiosShop';

const ResetShopPassword = () => {
    const { link } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (password, confirmPassword) => {
        try {
            const response = await axiosShop.post(`${POST_ROUTES_SHOP.RESET_PASSWORD(link)}`, { password, confirmPassword });
            if (response.data.success) {
                showToast("Password reset successfully", 'success');
                navigate(PATH_URL.SELL.LOG_IN);
            }
        } catch (error) {
            showToast(error?.response?.data?.error);
        };
    };


    return (
        <div>
            <ResetPasswordForm onSubmitHandler={handleSubmit} />
        </div>
    );
}

export default ResetShopPassword;

import React from 'react';
import ResetPasswordForm from '../../../components/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance, PATH_URL, POST_ROUTES } from '../../../constant';
import { useToast } from '../../../utils/ToastContext';

const ResetPassword = () => {

    const{link} = useParams();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const handleSubmit= async(password,confirmPassword)=>{
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.RESET_PASSWORD(link)}`,{password,confirmPassword});
            if(response.data.success){
                showToast("Password reset successfully",'success');
                navigate(PATH_URL.SELL.LOG_IN)
            }
        } catch (error) {
            showToast(error.response.data.error);
        };    
    };
    

    return (
        <div>
            <ResetPasswordForm onSubmitHandler={handleSubmit}/>
        </div>
    );
}

export default ResetPassword;

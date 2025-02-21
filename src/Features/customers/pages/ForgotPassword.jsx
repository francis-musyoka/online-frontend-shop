import React from 'react';
import ForgotPasswordForm from '../../../components/ForgotPasswordForm';
import { axiosInstance,POST_ROUTES,PATH_URL } from '../../../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';

const ForgotPassword = () => {

    const {showToast} = useToast();
    const navigate = useNavigate();

    const handleSubmit= async(email)=>{
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.FORGOT_PASSWORD}`,{email});
            if(response.data.success){
                showToast("A password reset link will be sent to this email if an account is registered under it.",'success');
                navigate(PATH_URL.SIGN_IN);
            }
        } catch (error) {
            if(error){
                showToast("A password reset link will be sent to this email if an account is registered under it.",'success')
                navigate(PATH_URL.SIGN_IN); 
            }
        }
    } 

    return (
        <div>
        <ForgotPasswordForm isSeller={false} onSubmitHandler={handleSubmit}/>
        </div>
    );
}

export default ForgotPassword;

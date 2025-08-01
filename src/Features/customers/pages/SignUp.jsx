import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAccount from '../../../components/OpenAccount';
import { PATH_URL, POST_ROUTES } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import axiosCustomer from '../../../utils/axiosCustomer';


const SignUp = () => {

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = async (formData) => {
        const { firstName, lastName, email, password, confirmPassword } = formData
        try {
            const response = await axiosCustomer.post(`${POST_ROUTES.SIGN_UP}`, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            });

            if (response.data.success) {
                showToast('Account created Successfully', 'success');
                navigate(PATH_URL.SIGN_IN);
            }

        } catch (error) {
            showToast(error.response.data.error, 'error');
        }

    };

    return (
        <>
            <OpenAccount onSubmitHandler={handleSubmit} isSeller={false} />
        </>
    );
};

export default SignUp;

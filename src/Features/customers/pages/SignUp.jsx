import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAccount from '../../../components/OpenAccount';
import { axiosInstance, PATH_URL, POST_ROUTES } from '../../../constant';


const SignUp = () => {

    const navigate = useNavigate();

    const handleSubmit = async(formData) => {
        console.log(formData);
        
        const{firstName, lastName, email, password,confirmPassword}=formData
        try {
            const response = await axiosInstance.post(`${POST_ROUTES.SIGN_UP}`,{
                firstName, 
                lastName, 
                email,
                password,
                confirmPassword
            });

            if(response.data.success === true){
                navigate(PATH_URL.SIGN_IN);
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    };

    return (
        <>
            <OpenAccount onSubmitHandler={handleSubmit} isSeller={false}/>
        </>
    );
};

export default SignUp;

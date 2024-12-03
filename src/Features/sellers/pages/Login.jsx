import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../../constant';
import SignInForm from '../../../components/SignInForm';

const SignIn = () => {
    
    const navigate = useNavigate();  

    const handleSubmit =(formData)=>{
        console.log(formData);
        navigate(`${PATH_URL.SELL.DASHBOARD}`)   
    }

    return (
        <>
            <SignInForm onSubmit={handleSubmit} isSeller={true}/>
        </>
    );
}

export default SignIn;

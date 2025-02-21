import React, {  } from 'react';
import SignInForm from '../../../components/SignInForm';
import { useAuth } from '../../../context/AuthContext';


const SignIn = () => {
    const {logInAction} =useAuth() ;
    const handleSubmit =(formData)=>{
        const {email,password} = formData;
        logInAction(email,password)
    }

    return (
        <>
            <SignInForm onSubmit={handleSubmit} isSeller={false}/>
        </>
    );
}

export default SignIn;

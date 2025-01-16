import React, {  } from 'react';
import SignInForm from '../../../components/SignInForm';
import { useAuth } from '../../../utils/AuthContext';


const SignIn = () => {
    const {logInAction} = useAuth();
    console.log(logInAction);
    
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

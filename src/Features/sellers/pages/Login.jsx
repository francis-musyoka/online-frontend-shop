import React, { } from 'react';
import SignInForm from '../../../components/SignInForm';
import { useShopAuth } from '../../../utils/ShopAuthContext';


const SignIn = () => {
   const {logIn} = useShopAuth();

    const handleSubmit =(formData)=>{
        logIn(formData)  
    }

    return (
        <>
            <SignInForm onSubmit={handleSubmit} isSeller={true}/>
        </>
    );
}

export default SignIn;

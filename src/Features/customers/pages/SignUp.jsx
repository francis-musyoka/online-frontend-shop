


import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAccount from '../../../components/OpenAccount';


const SignUp = () => {

    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        const{firstName, lastName, email, password}=formData
        navigate('/signin');
        
    };

    return (
        <>
            <OpenAccount onSubmitHandler={handleSubmit} isSeller={false}/>
        </>
    );
};

export default SignUp;

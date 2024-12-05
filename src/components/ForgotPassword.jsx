import React, { useState } from 'react';
import { isEmailValid } from '../utils';
import { useToast } from '../utils/ToastContext';
import { axiosInstance, PATH_URL, POST_ROUTES } from '../constant';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');

    const validateEmail = isEmailValid(email);
    const {showToast} = useToast();
    const navigate = useNavigate();

   
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(!validateEmail){
            setError('Enter valid email')
        }else{
            try {
               const response = await axiosInstance.post(`${POST_ROUTES.FORGOT_PASSWORD}`,{email});
               if(response.data.success){
                    showToast("A password reset link will be sent to this email if an account is registered under it.",'success');
                    setError('')
                    navigate(PATH_URL.SIGN_IN);
               }
               
            } catch (error) {
                if(error){
                    showToast("A password reset link will be sent to this email if an account is registered under it.",'success')
                    navigate(PATH_URL.SIGN_IN);
                    setError('');
                }
            }
            
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-3xl font-semibold text-center dark:text-neutral mb-6">
                    Reset your password
                </h1>  
                <p className="block text-sm font-medium text-gray-700 mb-6">
                    Enter the email address you used to register with.
                </p> 

                <div className="mb-4">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Email address'
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {error && <span className="text-red-700 text-xs">{error}</span>}
                </div>

                <div className="flex justify-between mt-6">
                    <Link 
                        to={PATH_URL.SIGN_IN}
                        className="w-full md:w-auto px-4 py-1 text-xl font-medium text-gray-900 rounded-lg border-2 border-neutral  "
                    >
                        Back
                    </Link>
                    <button
                        type="submit"
                        className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
}

export default ForgotPassword;

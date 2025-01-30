import React, { useState } from 'react';
import { useHooks } from '../hooks/useHooks';
import { validateChangePassword } from '../utils/validateForms';

const ResetPasswordForm = (props) => {
    const {onSubmitHandler} =props;
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [formError,setFormError] = useState({});

    const {status:showPassword,handleStatus:handleClick} = useHooks();
    

    const validateForm = ()=>{
        const currentPassword = null;
        const error = validateChangePassword(password,confirmPassword,currentPassword);
        console.log(error);
        setFormError(error)
        return Object.keys(error).length <1
    };
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const isValid = validateForm();
        
        if(isValid){
           onSubmitHandler(password,confirmPassword) 
        };
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-3xl font-semibold text-center dark:text-neutral mb-6">
                    Create new password
                </h1>  
                <p className="block text-sm font-medium text-gray-700 mb-6">
                    Your new password must be different from previous used passwords.
                </p> 

                <div className="mb-4">
                     <label htmlFor='password' className="block text-sm font-medium text-neutral">New Password</label>
                    <input
                        type={showPassword ?"text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {formError.password && <span className="text-red-700 text-xs">{formError.password}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor='confirmPassword' className="block text-sm font-medium text-neutral">Confirm Password</label>
                    <input
                        type={showPassword ?"text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {formError.confirmPassword && <span className="text-red-700 text-xs">{formError.confirmPassword}</span>}
                </div>
                <div class="flex justify-start mb-4">
                        <input 
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onClick={handleClick}
                            checked={showPassword}
                        />
                        <label for="show-password" class="ml-2 text-sm text-gray-600 dark:text-neutral">Show Password</label>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            class="w-full px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                        Submit
                        </button>
                    </div>
            </form>
        </div>

    );
}

export default ResetPasswordForm;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ValidateCreateAccountForm } from '../utils/validateForms';
import { PATH_URL } from '../constant';
import { useHooks } from '../hooks/useHooks';

const OpenAccount = (props) => {
    const {onSubmitHandler, isSeller, handleNextStep} = props
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [businessName, setBusinessName] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    

    const {status:showPassword, handleStatus:handleClick} = useHooks();


    // validate sign Up form
    const validateSignUpForm = () => {
        const errors = ValidateCreateAccountForm(firstName, lastName,null, null, email, password, confirmPassword);
        setFormErrors(errors);
        return Object.keys(errors).length < 1;
    };

    // Validate Open Business account form
    const validateOpenShopForm = () => {
        const errors = ValidateCreateAccountForm(null, null,businessName, businessNumber, email, password, confirmPassword);
        setFormErrors(errors);
        return Object.keys(errors).length < 1;
    };


    //Handle form Submission
    const handleSubmit = (e) => {
        const formData = {firstName, lastName, email, password ,confirmPassword}
        e.preventDefault();
        const isValid = validateSignUpForm();
        if (isValid) {
            onSubmitHandler(formData)
        }
    };

    const handleSellerNextStep = () => {
        const isValid = validateOpenShopForm(); 
        console.log("Form is Valid:", isValid);
        
        if (isValid) {
            const sellerData = {
                businessName,
                businessNumber,
                email,
                password,
                confirmPassword,
            };
            console.log(sellerData);
            
            handleNextStep(sellerData); 
        }  
    };

    return (
        <>
    
        <div className={"flex items-center min-h-screen bg-tertiary" }>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
                    
                    {isSeller ? (
                        <>
                            <SellerPart 
                                formErrors={formErrors} businessName={businessName} setBusinessName={setBusinessName} businessNumber={businessNumber} setBusinessNumber={setBusinessNumber} 
                            />  
                        </>
                    ):(
                        <>
                            <CustomerPart
                                formErrors={formErrors} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
                            />
                           
                        </>
                    )}
                
                    {/* Email Field */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                        >
                            Email address
                        </label>
                        {formErrors.email && <span className="text-red-700 text-xs">{formErrors.email}</span>}
                    </div>

                    {/* Password Fields */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                        >
                            Password
                        </label>
                        {formErrors.password && <span className="text-red-700 text-xs">{formErrors.password}</span>}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                        >
                            Confirm password
                        </label>
                        {formErrors.confirmPassword && <span className="text-red-700 text-xs">{formErrors.confirmPassword}</span>}
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onClick={handleClick}
                            checked={showPassword}
                        />
                        <label htmlFor="show-password" className="ml-2 text-lg text-gray-600 dark:text-gray-400">
                            Show Password
                        </label>
                    </div>

                    {isSeller ?(<>
                        <button
                            type="button"
                            onClick={handleSellerNextStep}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Continue
                        </button>

                    </>):(
                    <>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                           Sign Up
                        </button>

                        <p className="text-center text-gray-500 mt-4">
                        Already have an account?
                        <Link to="/signin" className="text-blue-600 hover:underline pl-2">
                            Sign in
                        </Link>
                         </p>
                    
                    </>)}          
                </form>
            </div>
        </>
    );
};

export default OpenAccount;


const SellerPart =(props)=>{
   const {formErrors, businessName,setBusinessName,businessNumber,setBusinessNumber} = props
    return(
        <>
         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Open New Shop
            </h1>
            <p className="text-md  text-center text-gray-800 mb-6">
                Already have a shop?  
                    <Link 
                        to={PATH_URL.SELL.LOG_IN}
                        class="text-sm text-blue-600 hover:underline dark:text-blue-400 pl-3"
                        >
                        Log In
                    </Link>
            </p>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="businessName"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="businessName"
                        className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                    >
                        Business Name
                    </label>
                    {formErrors.businessName && <span className="text-red-700 text-xs">{formErrors.businessName}</span>}
                </div>
            
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="tel"
                        name="businessNumber"
                        id="businessNumber"
                        value={businessNumber}
                        onChange={(e) => setBusinessNumber(e.target.value)}
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="businessNumber"
                        className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                    >
                        Business Phone Number
                    </label>
                    {formErrors.businessNumber && <span className="text-red-700 text-xs">{formErrors.businessNumber}</span>}
                </div>
            </div>
        </>
    )
};


const CustomerPart=(props)=>{
    const {formErrors,firstName,setFirstName,lastName,setLastName} = props
    return(
        <>
         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h1>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="firstName"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="firstname"
                        className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                    >
                        First Name
                    </label>
                    {formErrors.firstName && <span className="text-red-700 text-xs">{formErrors.firstName}</span>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="lastName"
                        className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                    >
                        Last Name
                    </label>
                    {formErrors.lastName && <span className="text-red-700 text-xs">{formErrors.lastName}</span>}
                </div>
            </div>
        </>
    )
}
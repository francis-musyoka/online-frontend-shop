import React,{useState} from 'react';
import { validateAddressForm } from '../../../utils/validateForms';
import OpenAccount from '../../../components/OpenAccount';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance, PATH_URL, POST_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../context/ToastContext';



const CreateAccount = () => {
    const storedData = JSON.parse(localStorage.getItem('addressData')) || {}
    const [step, setStep] = useState(1);
    const [openAccountData, setOpenAccountData] = useState({});
    const [addressData, setAddressData] = useState({
        addressLine1: storedData.addressLine1 || "",
        addressLine2: storedData.addressLine2 || "",
        city: storedData.city || "",
        state: storedData.state || "",
        zipCode: storedData.zipCode || "",
    });

    const [formErrors, setFormErrors] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const navigate =  useNavigate();
    const {showToast} = useToast();

    // Validates the form data for the address section
    const validateForm = (addressData) =>{
        const errors = validateAddressForm(addressData)
        if(!isChecked){
            errors.checked ="You must agree to the terms and conditions."
        }
        setFormErrors(errors)
        return Object.keys(errors).length < 1
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    };


    // Handles moving to the next step and store the values in openAccountData
    const handleNextStep = (data) => {
        setStep(step + 1); 
        setOpenAccountData(data);
    };


    // Decrements the step counter to go back to the previous step.
    const handlePreviousStep = () => {
        setStep(step - 1);
        localStorage.setItem('addressData', JSON.stringify(addressData))
    };

  
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const isValid = validateForm(addressData);
        let formData;
       
        try {
            if(isValid){
                formData = {...openAccountData, ...addressData};
            
                const response = await axiosInstance.post(POST_ROUTES_SHOP.CREATE_ACCOUNT,{formData});

                if(response.data.success){
                    showToast('Account created Successfully', 'success');
                    localStorage.clear();
                    navigate(PATH_URL.SELL.LOG_IN);
                }
            }
        } catch (error) {
            showToast(error.response.data.error, 'error'); 
        }
       
    }
    
    return (
        <div className='bg-gray-100'>
            {step === 1 && (
                <>
                    <OpenAccount isSeller={true} handleNextStep={handleNextStep}/>
                </>
            )}

            {step === 2 && (
                <>
                    <div className={`flex items-center min-h-screen bg-gray-100`}>
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
                            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                                Enter Business Address
                            </h1>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={addressData.addressLine1}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="addressLine1"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                >
                                    Address Line 1
                                </label>
                                {formErrors.addressLine1 && <span className="text-red-700 text-xs">{formErrors.addressLine1}</span>}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={addressData.addressLine2}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="addressLine2"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                >
                                    Address Line 2(optional)
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="city"
                                    value={addressData.city}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="city"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                >
                                    City
                                </label>
                                {formErrors.city && <span className="text-red-700 text-xs">{formErrors.city}</span>}
                                
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text"
                                    name="state"
                                    value={addressData.state}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="state"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                >
                                    State
                                </label> 
                                {formErrors.state && <span className="text-red-700 text-xs">{formErrors.state}</span>}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text"
                                    name="zipCode"
                                    value={addressData.zipCode}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="zipCode"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                >
                                Zip Code
                                </label> 
                                {formErrors.zipCode && <span className="text-red-700 text-xs">{formErrors.zipCode}</span>}
                            </div>
                            <div class="flex items-center mb-6">
                                <input 
                                    id="terms&conditions" 
                                    type="checkbox" 
                                    value={isChecked}
                                    onChange={(e)=>setIsChecked(e.target.checked)} 
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                />
                                <label 
                                    htmlFor="terms&conditions"
                                    className="ms-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                                    I agree with the 
                                    <Link 
                                        to="#" 
                                        class="text-blue-600 hover:underline dark:text-blue-500 pl-2"> 
                                        terms and conditions
                                    </Link>.
                                </label>
                        </div>
                        {formErrors.checked &&  <span className="block text-red-700 text-xs mt-1">{formErrors.checked}</span>}
                            
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default CreateAccount;

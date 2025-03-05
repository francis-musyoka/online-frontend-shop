import React, { useState } from 'react';
import { validateAddAddressForm } from '../../../utils/validateForms';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance, PATCH_ROUTES, PATH_URL, POST_ROUTES } from '../../../constant';
import { useToast } from '../../../context/ToastContext';

const AddAddress = (props) => {
    const {CheckOut} = props
    const location = useLocation();
    const edit = location.state?.edit || false;
    const editAddress = location.state?.address || {}

    const [address, setAddress] = useState({
        firstName: editAddress.firstName || "",
        lastName: editAddress.lastName || "",
        address: editAddress.address || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        zipCode: editAddress.zipCode || "",
        country: 'Kenya',
        phoneNumber: editAddress.phoneNumber ||""
    });

    const [formErrors, setFormErrors] = useState({});

    const {showToast} = useToast();
    const navigate = useNavigate();

    const handleChange = (e)=>{

        const { name, value } = e.target;


        setAddress((prev)=>({
            ...prev, [name]: value
        }));
    };

    const validateForm = ()=>{
        const errors = validateAddAddressForm(address);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddAddress = async()=>{
        console.log('hello');
        
        const isFormValid = validateForm();

        if(isFormValid){
            try {
                const {data} = await axiosInstance.post(POST_ROUTES.ADD_ADDRESS, {formData: address});
                if(data.success){
                    showToast(data.message, 'success');
                    navigate(PATH_URL.ACCOUNT.ADDRESS)
                }
            } catch (error) {
                showToast(error.response?.data?.error || "Error occured")
            };
        }; 
    };

    
    const handleSaveChanges = async()=>{

        const addressId = editAddress.id
        const isFormValid = validateForm();

        if(isFormValid){
            try {
                await axiosInstance.patch(PATCH_ROUTES.UPDATE_ADDRESS(addressId), {formData:address});
                showToast("Address updated succefully", 'success');
                navigate(PATH_URL.ACCOUNT.ADDRESS)
    
            } catch (error) {
                showToast(error.response?.data?.error || 'Failed to updated the Address');
            };
        }
    }
    

    return (
        <div className= {`${CheckOut ? " " : "max-w-screen-lg mx-auto mt-10 p-6 sm:p-6 " }`}>
            {!CheckOut &&(
                <div className='border-b-2 border-neutral'>
                    {edit ? (
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                        Edit your address
                    </h1>
                    ):(
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                            Add a new address 
                        </h1>
                    )}
                </div>
            )}
            
            <div className='my-5'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">

                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="firstName"
                                className="peer-focus:font-medium text-base text-neutral"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={address.firstName}
                                onChange={handleChange}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                        
                            {formErrors.firstName && <span className="text-red-700 text-xs">{formErrors.firstName}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="lastName"
                                className="peer-focus:font-medium text-base text-neutral"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={address.lastName}
                                onChange={handleChange}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            
                            {formErrors.lastName && <span className="text-red-700 text-xs">{formErrors.lastName}</span>}
                        </div>
                    
                    </div>

                    <div className="relative z-0 w-full mb-5 group pt-6">
                        <label
                            htmlFor="address"
                            className="peer-focus:font-medium text-base text-neutral"                    >
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={address.address}
                            onChange={handleChange}
                            className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        
                        {formErrors.address && <span className="text-red-700 text-xs">{formErrors.address}</span>}
                    </div>

                    <div className="relative z-0 w-full mb-5 group pt-6">
                        <label
                            htmlFor="apartment"
                            className="peer-focus:font-medium text-base text-neutral"                    >
                            Apartment, suite, etc.
                        </label>
                        <input
                            type="text"
                            name="apartment"
                            // value={address.address}
                            // onChange={handleChange}
                            className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        
                        {formErrors.address && <span className="text-red-700 text-xs">{formErrors.address}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">

                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="city"
                                className="peer-focus:font-medium text-base text-neutral">
                                City
                            </label> 
                            <input 
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                        
                            {formErrors.state && <span className="text-red-700 text-xs">{formErrors.state}</span>}
                        </div>

                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="country"
                                className="peer-focus:font-medium text-base text-neutral"                    >
                                Country / Region
                            </label> 
                            <input 
                                type="text"
                                name="country"
                                value={address.country}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                        
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">

                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="state"
                                className="peer-focus:font-medium text-base text-neutral"                    >
                                State / Province
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            
                            {formErrors.city && <span className="text-red-700 text-xs">{formErrors.city}</span>}
                            
                        </div>
                        
                        <div className="relative z-0 w-full mb-5 group pt-6">
                            <label
                                htmlFor="zipCode"
                                className="peer-focus:font-medium text-base text-neutral"                    >
                            Zip Code
                            </label> 
                            <input 
                                type="text"
                                name="zipCode"
                                value={address.zipCode}
                                onChange={handleChange}
                                className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                            
                            {formErrors.zipCode && <span className="text-red-700 text-xs">{formErrors.zipCode}</span>}
                        </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 group pt-6">
                        <label
                            htmlFor="phoneNumber"
                            className="peer-focus:font-medium text-base text-neutral"                    >
                            Phone Number
                        </label> 
                        <input 
                            type="number"
                            name="phoneNumber"
                            value={address.phoneNumber}
                            onChange={handleChange}
                            className="block bg-white py-2 px-2 mt-3 w-full text-sm sm:text-lg text-gray-900 bg-transparent  border-2 rounded-md border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        {formErrors.phoneNumber && <span className="text-red-700 text-xs">{formErrors.phoneNumber}</span>}
                    </div>
                </div>


            <div className="flex justify-between my-10">
                <Link
                    to={PATH_URL.ACCOUNT.ADDRESS}
                    className="py-1 px-4 border border-neutral bg-white text-neutral hover:bg-tertiary"
                >
                    Cancel
                </Link>

                {edit ? (
                    <button
                        type='submit'
                        onClick={handleSaveChanges}
                        className="py-1 px-4 bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                ):(
                    <button
                        type='submit'
                        onClick={handleAddAddress}
                        className="py-1 px-4 bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Add Address
                    </button>
                )}
            </div>
 
        </div>
    );
}

export default AddAddress;

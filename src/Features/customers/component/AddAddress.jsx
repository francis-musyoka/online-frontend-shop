import React, { useState } from 'react';
import { validateAddAddressForm } from '../../../utils/validateForms';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance, PATCH_ROUTES, PATH_URL, POST_ROUTES } from '../../../constant';
import { useToast } from '../../../context/ToastContext';

const AddAddress = () => {
   
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
        <div className="max-w-screen-lg mx-auto mt-10 p-6 sm:p-6 bg-white shadow-lg rounded-lg relative">
            {edit ? (
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                 Edit your address
            </h1>
            ):(
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Add a new address 
                </h1>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="firstName"
                        value={address.firstName}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="firstName"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        First Name
                    </label>
                    {formErrors.firstName && <span className="text-red-700 text-xs">{formErrors.firstName}</span>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="lastName"
                        value={address.lastName}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="lastName"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        Last Name
                    </label>
                    {formErrors.lastName && <span className="text-red-700 text-xs">{formErrors.lastName}</span>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="address"
                        value={address.address}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="address"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        Address
                    </label>
                    {formErrors.address && <span className="text-red-700 text-xs">{formErrors.address}</span>}
                </div>

                
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="state"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        State
                    </label>
                    {formErrors.city && <span className="text-red-700 text-xs">{formErrors.city}</span>}
                    
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        City
                    </label> 
                    {formErrors.state && <span className="text-red-700 text-xs">{formErrors.state}</span>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                    <label
                        htmlFor="zipCode"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                    Zip Code
                    </label> 
                    {formErrors.zipCode && <span className="text-red-700 text-xs">{formErrors.zipCode}</span>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="country"
                        value={address.country}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                    <label
                        htmlFor="country"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        Country/Region
                    </label> 
                
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="number"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleChange}
                        className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="phoneNumber"
                        className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                    >
                        Phone Number
                    </label> 
                    {formErrors.phoneNumber && <span className="text-red-700 text-xs">{formErrors.phoneNumber}</span>}
                </div>

            </div>
            <div className="flex justify-between ">
        
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

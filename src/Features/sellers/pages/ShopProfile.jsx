import React, { useEffect, useState } from 'react';
import { validateAddressForm, validate } from '../../../utils/validateForms';
import Button from '../../../components/Button';
import { axiosInstance, POST_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import { useShopAuth } from '../../../hooks/useAppSelectors';
import { useDispatch } from 'react-redux';
import { fetchShopProfile } from '../../../redux/actionsCreators/shopAuthActions';



const ShopProfile = () => {
    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "+254",
        shopName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const { shopProfile, shopIsAuthenticated } = useShopAuth();
    const { showToast } = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (shopIsAuthenticated) {
            dispatch(fetchShopProfile());
        }
    }, [dispatch, shopIsAuthenticated]);;

    useEffect(() => {
        if (shopProfile) {
            setFormData((prev) => ({
                ...prev,
                email: shopProfile.email || "",
                phoneNumber: shopProfile.businessNumber || "+254",
                shopName: shopProfile.businessName || "",
                addressLine1: shopProfile.addressLine1 || "",
                addressLine2: shopProfile.addressLine2 || "",
                city: shopProfile.city || "",
                state: shopProfile.state || "",
                zipCode: shopProfile.zipCode || "",
            }));
        }
    }, [shopProfile]);;

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const validateForm = (formData) => {
        const result1 = validate(formData);
        const result2 = validateAddressForm(formData);
        const errors = { ...result1, ...result2 };
        setFormErrors(errors);

        return Object.keys(errors).length < 1;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(formData);

        if (isValid) {
            const confirm = window.confirm("Do you what to make changes")
            try {
                if (confirm) {
                    const response = await axiosInstance.post(POST_ROUTES_SHOP.UPDATE_SHOP_PROFILR(shopProfile.id), { formData });
                    if (response.data.success) {
                        showToast('Shop profile updated successfully', 'success');
                    }
                }
            } catch (error) {
                console.log(error.response.data.error);
                showToast(error.response.data.error)
            };
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mx-auto border rounded-lg shadow-sm bg-white mb-20 mt-4'>
                <div className='py-6 px-6'>
                    <h1 className=' text-2xl mb-3 '>Account details</h1>
                    <p>Your shop information</p>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6  px-6">

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Account Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.email && <span className="text-red-700 text-xs">{formErrors.email}</span>}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.phoneNumber && <span className="text-red-700 text-xs">{formErrors.phoneNumber}</span>}
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group  px-6">
                    <label
                        htmlFor="shopName"
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Shop Name
                    </label>
                    <input
                        type="shopName"
                        name="shopName"
                        id="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        className="block  w-full md:w-1/2   py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    />
                    {formErrors.shopName && <span className="text-red-700 text-xs">{formErrors.shopName}</span>}

                </div>

                <hr className="border-t border-gray-300 my-12 mx-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-6">

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="addressLine1"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            name="addressLine1"
                            id="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.addressLine1 && <span className="text-red-700 text-xs">{formErrors.addressLine1}</span>}

                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="addressLine2"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            name="addressLine2"
                            id="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />

                    </div>


                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="city"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.city && <span className="text-red-700 text-xs">{formErrors.city}</span>}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="state"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.state && <span className="text-red-700 text-xs">{formErrors.state}</span>}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="zipCode"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Zip Code
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        {formErrors.zipCode && <span className="text-red-700 text-xs">{formErrors.zipCode}</span>}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="country"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value="Kenya"
                            onChange=""
                            readOnly
                            className="block w-full py-3 px-4 text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div className=" text-right px-6 mb-10">
                    <Button label="Save" variant="secondary" size="medium" />
                </div>
            </form>




        </div>
    );
}

export default ShopProfile;

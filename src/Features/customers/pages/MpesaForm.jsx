import { useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { PATCH_ROUTES, POST_ROUTES } from '../../../constant';
import { isPhoneNumberValid } from '../../../utils';
import axiosCustomer from '../../../utils/axiosCustomer';

const MpesaForm = (props) => {
    const { paymentDetails, setPaymentDetails } = props;

    const [phoneNumber, setPhoneNumber] = useState(paymentDetails?.phoneNumber || '');
    const [displayForm, setDisplayForm] = useState(!paymentDetails?.phoneNumber);

    // const [displayForm, setDisplayForm] = useState(paymentDetails?.phoneNumber ? false : true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { showToast } = useToast();

    const countryCode = "254"

    const validatePhoneNumber = isPhoneNumberValid(phoneNumber);

    const handleSave = async () => {
        if (validatePhoneNumber) {
            try {
                const { data } = await axiosCustomer.post(POST_ROUTES.MPESA_PAYMENT, { phoneNumber, countryCode });

                if (data.success) {
                    showToast('Phone number saved successfully', 'success');

                    setPaymentDetails(data.payment)
                    sessionStorage.setItem("payment", JSON.stringify(data.payment))
                    setIsEditing(false);
                    setDisplayForm(false);
                    setError('')
                }
            } catch (error) {
                showToast(error.response?.data?.error || 'Failed to save Mpesa number')
            }
        } else {
            setError('Please enter valid phone number')
        };
    };


    const handleSaveChanges = async () => {
        if (validatePhoneNumber) {
            try {
                const { data } = await axiosCustomer.patch(PATCH_ROUTES.UPDATE_MPESA_PAYMENT(paymentDetails.id), { phoneNumber });

                if (data.success) {
                    showToast('Phone number update successfully', 'success')
                    setPaymentDetails(prev => ({ ...prev, phoneNumber: phoneNumber }));
                    sessionStorage.setItem("payment", JSON.stringify({ ...paymentDetails, phoneNumber: phoneNumber }));
                    setIsEditing(false);
                    setError('')
                }

            } catch (error) {
                showToast(error.response?.data?.error || 'Failed to save Mpesa number')
            }
        } else {
            setError('Please enter valid phone number')
        };
    };


    const handleDelete = async () => {
        try {
            await axiosCustomer.post(POST_ROUTES.DELETE_MPESA_PAYMENT(paymentDetails.id));
            setDisplayForm(true);
            setPaymentDetails(null);
            setPhoneNumber('')
            sessionStorage.removeItem("payment")
        } catch (error) {
            showToast(error.response?.data?.error || "Failed to remove payment number", "error");
        }

    };


    return (
        <div>
            {displayForm || isEditing ? (
                <>
                    <div class="w-full max-w-sm min-w-[200px] mt-4">
                        <label class="block mb-1 text-sm text-slate-600">Enter Phone Number</label>
                        <div class="relative mt-2">
                            <div class="absolute top-2 left-0 flex items-center pl-3">
                                <span
                                    class="h-full text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none" id="dropdownSpan"
                                >
                                    +{countryCode}
                                </span>
                                <div class="h-6 border-l border-slate-200 ml-2"></div>
                            </div>
                            <input
                                type="tel"
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                id="phoneNumberInput"
                            />
                            {error && <span className="text-red-700 text-xs">{error}</span>}
                        </div>
                    </div>

                    {isEditing ? (
                        <button
                            onClick={handleSaveChanges}
                            className='mt-6 bg-secondary py-1 px-3 rounded-md'
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className='mt-6 bg-secondary py-1 px-3 rounded-md'
                        >
                            Save
                        </button>
                    )

                    }

                </>
            ) : (
                <div className="flex items-center mt-6 space-x-4">
                    <p className="text-lg font-medium">Payment number: {`${countryCode}${phoneNumber}`}</p>
                    <span className="text-gray-400">|</span>
                    <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline">Edit</button>
                    <span className="text-gray-400">|</span>
                    <button onClick={handleDelete} className="text-red-600 hover:underline">Delete</button>
                </div>
            )}




        </div>
    );
}

export default MpesaForm;

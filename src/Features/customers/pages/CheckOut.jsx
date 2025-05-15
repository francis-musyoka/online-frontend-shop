import React, { useEffect, useState } from 'react';
import { axiosInstance, BASEURL, GET_ROUTES, POST_ROUTES } from '../../../constant';
import SelectAddress from '../component/SelectAddress';
import { useCartContext } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { pollTransactionStatus, CheckStatusAgain } from '../../../utils/checkTransactionStatus';
import Spinning from '../../../components/Spinning';
import { useNavigate } from 'react-router-dom';
import MpesaForm from "./MpesaForm"

const CheckOut = () => {


    const [allAddresses, setAllAddresses] = useState([]);
    const [onChangingAddress, setOnChangingAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(() => {
        const storedAddress = localStorage.getItem('selectedAddress');
        return storedAddress ? JSON.parse(storedAddress) : null;
    });

    const [paymentMethod, setPaymentMethod] = useState(localStorage.getItem('paymentMethod') || '');
    const [paymentDetails, setPaymentDetails] = useState(() => {
        const storedPayment = sessionStorage.getItem('payment');
        return storedPayment ? JSON.parse(storedPayment) : null;
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [pollStatus, setPollStatus] = useState('idle');
    const [lastTransactionId, setLastTransactionId] = useState(localStorage.getItem('lastTransactionId') || null);
    const [orderNumber, setOrderNumber] = useState(localStorage.getItem('orderNumber') || null);

    const { cartItem, totalAmount, } = useCartContext();
    const { showToast } = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAddresses = async () => {
            const { data } = await axiosInstance.get(GET_ROUTES.GET_ADDRESSES);
            if (data.success) {
                setAllAddresses(data.addresses);
            };
        };
        fetchAddresses();
    }, []);

    useEffect(() => {
        if (!paymentDetails) {
            const fetchPaymentDetails = async () => {
                try {
                    const { data } = await axiosInstance.get(GET_ROUTES.GET_MPESA_PAYMENT);
                    if (data.success) {
                        setPaymentDetails(data.payment);
                        sessionStorage.setItem('payment', JSON.stringify(data.payment))
                    }
                } catch (error) {
                    console.error("Failed to fetch payment details", error);
                }
            };
            fetchPaymentDetails();
        }
    }, [paymentDetails]);



    useEffect(() => {
        if (!selectedAddress && allAddresses?.length) {
            const selectAddress = allAddresses?.find(address => address.isDefault) || allAddresses?.[0]
            setSelectedAddress(selectAddress)
            localStorage.setItem('selectedAddress', JSON.stringify(selectAddress));
        };
    }, [allAddresses, selectedAddress]);


    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
        localStorage.setItem('selectedAddress', JSON.stringify(address));
    }


    const Shipping = 0;
    const total = totalAmount + Shipping;

    const phoneNumber = `${paymentDetails?.countryCode}${paymentDetails?.phoneNumber}`

    const handlePaymentMethod = (paymentMethod) => {
        setPaymentMethod(paymentMethod)
        localStorage.setItem('paymentMethod', paymentMethod)
    };
    useEffect(() => {
        if (pollStatus === "failed" || pollStatus === "success") {
            setLastTransactionId('idle');
            setLastTransactionId(null);
            setOrderNumber(null);
            localStorage.removeItem("lastTransactionId");
            localStorage.removeItem("orderNumber")
        }
    }, [pollStatus]);


    const confirmOrderButton = async () => {
        if (selectedAddress && paymentDetails) {

            const items = cartItem.map(item => ({
                productName: item.product.productName,
                price: item.product.price,
                productId: item.productId,
                quantity: item.quantity,
                image: item.product.image[0],
            }));

            const { id, isDefault, firstName, lastName, ...rest } = selectedAddress;
            const shippingAddress = {
                ...rest,
                fullName: `${firstName} ${lastName}`,
            };

            try {
                // Create Order
                setIsProcessing(true)
                const orderResponse = await axiosInstance.post(POST_ROUTES.CREATE_ORDER, {
                    items,
                    paymentMethod,
                    shippingAddress,
                });

                if (orderResponse.data.success) {
                    setOrderNumber(orderResponse.data.orderId);
                    console.log(orderResponse.data.orderId);

                    localStorage.setItem('orderNumber', orderResponse.data.orderId);

                    // Initiate M-pesa Transaction
                    const transactionResponse = await axiosInstance.post(POST_ROUTES.MPESA_TRANSCATION, { total, phoneNumber, orderNumber });

                    if (transactionResponse.data.success) {
                        const transactionId = transactionResponse.data.data.CheckoutRequestID;
                        setLastTransactionId(transactionId)
                        localStorage.setItem('lastTransactionId', transactionId)
                        showToast('Please check your phone and enter your M-Pesa PIN.', 'success');

                        // Start polling for transaction status
                        pollTransactionStatus(transactionId, showToast, setPollStatus, orderNumber, navigate);
                    };
                }

            } catch (error) {
                console.log(error);
                showToast('Error occured, Please try again', 'error')

            } finally {
                setIsProcessing(false)
            }
        } else {
            showToast('Select payment and address')
        }
    };

    return (
        <>
            {pollStatus === 'checking' ? (
                <div >
                    <Spinning payment={true} />
                </div>
            ) : pollStatus === 'timeout' ? (
                <div className="text-center my-4">
                    <p className="text-yellow-700 font-medium">Still no response from M-Pesa.</p>
                    <p className="text-sm text-gray-600 mt-1">
                        If you've already completed the payment on your phone, tap the button below to recheck the status.
                    </p>
                    <p className="text-xs text-gray-500 mt-1 italic">
                        Please don’t refresh or leave this page while we verify.
                    </p>
                    <button
                        onClick={() => CheckStatusAgain(lastTransactionId, showToast, setPollStatus, orderNumber, navigate)}
                        className="btn-primary mt-3 px-2 py-1 rounded-md"
                    >
                        Check Again
                    </button>
                </div>
            ) : (
                <div className="flex justify-center bg-gray-100 py-10">
                    <div className="max-w-7xl w-full px-3 md:flex md:space-x-6 xl:px-0 items-start">
                        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">

                            <h1 className='text-black text-xl font-medium border-b pb-3'>Shipping Information</h1>
                            {!onChangingAddress && selectedAddress ? (
                                <div className='pl-6'>
                                    <h1 className='font-bold'>{selectedAddress.firstName} {selectedAddress.lastName}</h1>
                                    <p className='mb-3'>{selectedAddress.address} | {selectedAddress.apartment} | {selectedAddress.city},
                                        {selectedAddress.state} | {selectedAddress.phoneNumber}
                                    </p>
                                    <button
                                        onClick={() => setOnChangingAddress(true)}
                                        className='bg-secondary py-2 px-3 text-black rounded-md'
                                    >
                                        Change Address
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <SelectAddress onAddingAddress={(newAddress) => setAllAddresses(prev => [...prev, newAddress])} addresses={allAddresses} selectedLocation={selectedAddress} onSelect={handleAddressSelection} closeModel={() => setOnChangingAddress(false)} />
                                </div>
                            )}

                            <hr className="border-t-2 border-gray-200 my-6" />

                            <div>
                                <h1 className='text-black text-xl font-medium'>Payment Methods</h1>

                                <div className='flex mt-4 space-x-8'>
                                    <label htmlFor="M-pesa" className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name='payment'
                                            id='M-pesa'
                                            value='M-pesa'
                                            checked={paymentMethod === "M-Pesa"}
                                            onChange={() => handlePaymentMethod('M-Pesa')}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="text-xl text-gray-950">M-Pesa</span>
                                    </label>
                                    <label htmlFor="card" className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name='payment'
                                            id='card'
                                            value='card'
                                            checked={paymentMethod === "Card"}
                                            onChange={() => handlePaymentMethod('Card')}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                        <span className="text-xl text-gray-950">Card</span>
                                    </label>
                                </div>
                                {paymentMethod === "M-Pesa" ? (
                                    <MpesaForm paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails} />
                                ) : paymentMethod === "Card" ? (
                                    <h1> Card coming soon</h1>
                                ) : (<></>)}
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md ">
                            <h1 className='text-black text-xl font-medium border-b pb-3'>Order Summary</h1>

                            <div className="divide-y">
                                {cartItem.map(product => (
                                    <div key={product.productId} className="flex items-center justify-between py-4">
                                        <img
                                            src={product.product.image && product.product.image.length > 0 ? `${BASEURL}${product.product.image[0]}` : null}
                                            alt="product-image"
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h1 className="text-lg font-normal text-gray-900 line-clamp-2">{product.product.productName}</h1>
                                            <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                                                <p>Quantity: {product.quantity}</p>
                                                <p className="text-base font-medium text-black">KSH {product.product.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <hr className="border-t-2 border-gray-200 my-4" />
                            <div className="mt-6">
                                <div className="flex justify-between text-gray-700">
                                    <p>Subtotal</p>
                                    <p>KSH {totalAmount.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between text-gray-700 mt-2">
                                    <p>Shipping</p>
                                    <p>KSH {Shipping}</p>
                                </div>
                                <hr className="border-t-2 border-gray-200 my-4" />
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>KSH {total.toLocaleString()}</p>
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-200 my-4" />
                            <div className="mt-6">
                                <button
                                    disabled={isProcessing}
                                    onClick={confirmOrderButton}
                                    className="w-full bg-blue-800 text-white py-3 rounded-lg text-center font-medium disabled:cursor-not-allowed"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>

    );
}

export default CheckOut;



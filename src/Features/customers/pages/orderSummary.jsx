import { useEffect, useState } from 'react';
import { BASEURL, GET_ROUTES } from '../../../constant';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosCustomer from '../../../utils/axiosCustomer';

const OrderSummary = () => {
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    const { orderNumber } = useParams();
    const [searchParams] = useSearchParams();
    const view = searchParams.get('view')


    console.log(view);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosCustomer.get(GET_ROUTES.GET_ORDER_SUMMARY(orderNumber));

                if (response.data.success) {
                    setOrderDetails(response.data.orderDetails)
                    setOrderItems(response.data.orderItems);
                }

            } catch (error) {
                console.log(error);

            }
        };
        fetchOrder();
    }, [orderNumber]);


    const formatted = new Date(orderDetails?.updatedAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    const { city, state, address, zipCode, fullName, apartment, phoneNumber } = orderDetails?.Order?.shippingAddress || {};
    const { firstName, lastName, email } = orderDetails?.Customer || {};

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container bg-gray-100 2xl:mx-auto">
            <div className="flex justify-start items-center space-y-2 flex-col">
                <p className="text-xl text-gray-800 ">Hi <span className='font-medium'>{firstName} {lastName}</span>,</p>
                <p className="text-lg text-gray-800 mb-3">Thank you for your order! We're currently processing it and will notify you once it's on its way.</p>
                <p className="text-lg text-gray-800 mb-3">An invoice has been sent to your email: <span className='font-medium'>{email}</span></p>
            </div>

            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                    <div className="flex flex-col justify-start items-start  bg-white  rounded-md shadow-sm px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ">
                        <div className="flex justify-start border-b border-gray-950 w-full item-start space-y-2 flex-col">
                            <p className="text-lg text-gray-800">Order: <span className="pl-2 text-blue-500 text-base">#{orderDetails?.Order?.orderNumber}</span></p>
                            <p className="text-lg text-gray-800 pb-5">Order Payment : <span className="pl-2 text-gray-500 text-base">{formatted}</span></p>
                        </div>
                        {orderItems?.map(item => (
                            <div key={item.id} className="mt-4 md:mt-6   flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">

                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                        className="w-16 h-16 object-cover rounded-lg"
                                        src={item?.imagePath ? `${BASEURL}${item.imagePath}` : null}
                                        alt="productImage" />
                                </div>
                                <div className="md:flex-row flex-col  border-b border-gray-200 flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h4 className="text-lg font-medium  text-gray-800">{item.productName}</h4>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base xl:text-lg "> Ksh: {item.price.toLocaleString()}</p>
                                        <p className="text-base xl:text-lg  text-gray-800">{item.quantity}</p>
                                        <p className="text-base xl:text-lg font-semibold  text-gray-800">Ksh:  {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white  rounded-md shadow-sm space-y-6">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                            <div className="flex justify-between w-full">
                                <p className="text-base  text-neutral">Subtotal</p>
                                <p className="text-base  text-neutral">Ksh: {orderDetails?.Order?.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base  text-neutral">Discount </p>
                                <p className="text-base text-neutral">Ksh: 0</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base  text-neutral">Shipping</p>
                                <p className="text-base  text-neutral">Ksh: 0</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base font-semibold  text-gray-800">Total</p>
                            <p className="text-base font-semibold  text-neutral">Ksh: {orderDetails?.Order?.totalAmount.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-white w-full xl:w-96 p-6  md:pl-8 pl-5 rounded-md shadow-sm flex flex-col space-y-6">
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                            <div>
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Payment Method</h3>
                                <p className="text-sm text-gray-500">{orderDetails?.Order?.paymentMethod}</p>
                                <p className="text-sm text-gray-500">{orderDetails.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                            <div className="flex flex-col">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Shipping To:</h3>
                                <p className="text-base text-gray-900">{fullName}</p>
                                <p className="text-sm text-gray-500">{`${address} ${apartment}, ${city} ${state} ${zipCode}`}</p>
                                <p className="text-sm text-gray-500">{phoneNumber}</p>
                            </div>

                        </div>
                        {/* <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                                <div className="flex flex-col">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Billing Address</h3>
                                <p className="text-sm text-gray-500">180 North King Street,Northhampton MA 1060</p>
                                </div>
                
                            </div> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrderSummary;

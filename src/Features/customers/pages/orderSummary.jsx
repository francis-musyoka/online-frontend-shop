import React from 'react';

const OrderSummary = () => {

    const today = new Date();
    const formatted = today.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // for AM/PM format
      });

    return (
        <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container bg-gray-100 2xl:mx-auto">
             <div class="flex justify-start items-center space-y-2 flex-col">
                <p class="text-xl text-neutral font-semibold">Payment Successful</p>
                <p class="text-lg text-gray-800 mb-3">We appreciate your order, we’re currently processing it.</p>
            </div> 
            
            <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    
                    <div class="flex flex-col justify-start items-start  bg-white  rounded-md shadow-sm px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ">
                        <div class="flex justify-start border-b border-gray-950 w-full item-start space-y-2 flex-col">
                            <p class="text-lg text-gray-800">Order: <span class="pl-2 text-blue-500 text-base">#12367</span></p>
                            <p class="text-lg text-gray-800 pb-5">Order Payment : <span class="pl-2 text-gray-500 text-base">{formatted}</span></p>
                        </div> 

                        <div class="mt-4 md:mt-6   flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                <img  className="w-16 h-16 object-cover rounded-lg" src="https://www.ikojn.com/cdn/shop/files/WQP04995-Edit_720x.jpg?v=1742476422" alt="dress" />
                            </div>
                            <div class="md:flex-row flex-col  border-b border-gray-200 flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                    <h4 class="text-lg font-medium  text-gray-800">Premium Quaility Dress</h4>
                                </div>
                                <div class="flex justify-between space-x-8 items-start w-full">
                                    <p class="text-base xl:text-lg ">$36.00 </p>
                                    <p class="text-base xl:text-lg  text-gray-800">1</p>
                                    <p class="text-base xl:text-lg font-semibold  text-gray-800">$36.00</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                            <div class="w-full md:w-40">
                                <img  className="w-16 h-16 object-cover rounded-lg" src="https://i.ebayimg.com/images/g/-7cAAOSw8j9mVp3i/s-l960.webp" alt="dress" />
                            </div>
                            <div class="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 class="text-lg font-medium  text-gray-800">High Quaility Italic Dress</h3>
                                   
                                </div>
                                <div class="flex justify-between space-x-8 items-start w-full">
                                    <p class="text-base xl:text-lg ">$20.00 </p>
                                    <p class="text-base xl:text-lg  text-gray-800">1</p>
                                    <p class="text-base xl:text-lg font-semibold  text-gray-800">$20.00</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white  rounded-md shadow-sm space-y-6">
                            <h3 class="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                    <p class="text-base  text-neutral">Subtotal</p>
                                    <p class="text-base  text-neutral">$56.00</p>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base  text-neutral">Discount </p>
                                    <p class="text-base text-neutral">-$28.00 (50%)</p>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base  text-neutral">Shipping</p>
                                    <p class="text-base  text-neutral">$8.00</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center w-full">
                                <p class="text-base font-semibold  text-gray-800">Total</p>
                                <p class="text-base font-semibold  text-neutral">$36.00</p>
                            </div>
                        </div>

                        {/* <div class="bg-white w-full xl:w-96 p-6 md:pl-8 pl-5 border-2 border-gray-950 rounded-md shadow-sm flex flex-col space-y-6">
                         <div class="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                                <div>
                                    <h3 class="text-base font-semibold text-gray-800 mb-2">Payment Method</h3>
                                    <p class="text-sm text-gray-500">M-pesa</p>
                                    <p class="text-sm text-gray-500">254728XXXX74</p>
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                                <div class="flex flex-col">
                                <h3 class="text-base font-semibold text-gray-800 mb-2">Shipping Address</h3>
                                <p class="text-sm text-gray-500">180 North King Street,</p>
                                <p class="text-sm text-gray-500">Northhampton MA 1060</p>
                                </div>

                                <div class="flex flex-col md:pl-3">
                                <h3 class="text-base font-semibold text-gray-800 mb-2">Billing Address</h3>
                                <p class="text-sm text-gray-500">180 North King Street,</p>
                                <p class="text-sm text-gray-500">Northhampton MA 1060</p>
                                </div>
                            </div>
                        </div> */}

                        <div class="bg-white w-full xl:w-96 p-6  md:pl-8 pl-5 rounded-md shadow-sm flex flex-col space-y-6">
                            <div class="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                                <div>
                                    <h3 class="text-base font-semibold text-gray-800 mb-2">Payment Method</h3>
                                    <p class="text-sm text-gray-500">M-pesa</p>
                                    <p class="text-sm text-gray-500">254728XXXX74</p>
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                                <div class="flex flex-col">
                                <h3 class="text-base font-semibold text-gray-800 mb-2">Shipping Address</h3>
                                <p class="text-sm text-gray-500">180 North King Street,Northhampton MA 1060</p>
                                </div>
                
                            </div>
                            <div class="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                                <div class="flex flex-col">
                                <h3 class="text-base font-semibold text-gray-800 mb-2">Billing Address</h3>
                                <p class="text-sm text-gray-500">180 North King Street,Northhampton MA 1060</p>
                                </div>
                
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        
    );
}

export default OrderSummary;

import React from 'react';
import AddAddress from '../component/AddAddress';



const CheckOut = () => {

    const products = [
        {
            id:1,
            image: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/224652/1.jpg?6998',
            name: 'Vitron V527 - 2.1 CH Multimedia Speaker',
            price: 35000,
            quantity: 2
        },
        {
            id:2,
            image: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/8894252/1.jpg?1211',
            name: 'Hamilton Modern Design Coffee Table ',
            price: 3500,
            quantity: 1
        },
        {
            id:3,
            image: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/20/2282682/1.jpg?8244',
            name: 'Sonar Stainless Steel 1.8Ltr Electric Kettle',
            price: 350,
            quantity: 1
        },
    ]
    const Shipping = 500;
    const SubTotal = products.reduce((sum,product)=> sum + product.price * product.quantity, 0);
    const total = SubTotal + Shipping;

    return (
        <div className="flex justify-center bg-gray-100 py-10">
           <div className="max-w-7xl w-full px-3 md:flex md:space-x-6 xl:px-0 items-start">
                <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <h1 className='text-black text-xl font-medium border-b pb-3'>Shipping Information</h1>
                        <AddAddress CheckOut={true} />
                    </div>
    
                    <hr className="border-t-2 border-gray-200 my-6" />

                    <div>
                        <h1 className='text-black text-xl font-medium'>Payment Methods</h1>
                        <div className='flex mt-4 space-x-8'>
                            <label className="flex items-center space-x-3">
                                <input type="radio" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xl text-gray-950">M-Pesa</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xl text-gray-950">Card</span>
                            </label>
                        </div>
                    </div>
                </div>
    
                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md ">
                    <h1 className='text-black text-xl font-medium border-b pb-3'>Order Summary</h1>
    
                    <div className="divide-y">
                        {products.map(product => (
                            <div key={product.id} className="flex items-center justify-between py-4">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                
                                <div className="ml-4 flex-1">
                                    <h1 className="text-lg font-normal text-gray-900 line-clamp-2">{product.name}</h1>
                                    <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                                        <p>Quantity: {product.quantity}</p>
                                        <p className="text-base font-medium text-black">KSH {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                           
                        ))}
                    </div>
                    <hr className="border-t-2 border-gray-200 my-4" />
                    <div className="mt-6">
                        <div className="flex justify-between text-gray-700">
                            <p>Subtotal</p>
                            <p>KSH {SubTotal.toLocaleString()}</p>
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
                        <button className="w-full bg-blue-800 text-white py-3 rounded-lg text-center font-medium">
                            Confirm Order
                        </button>
                    </div>
                </div>
    
            </div>
        </div>
    );
}

export default CheckOut;

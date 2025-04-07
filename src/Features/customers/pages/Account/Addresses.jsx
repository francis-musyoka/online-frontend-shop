import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance, GET_ROUTES, PATH_URL, POST_ROUTES } from '../../../../constant';
import { useToast } from '../../../../context/ToastContext';

const Addresses = () => {

    const [addresses,setAddresses] = useState([]);
    const {showToast} = useToast();

    useEffect(()=>{
        const fetchAddresses = async()=>{
            const {data} = await axiosInstance.get(GET_ROUTES.GET_ADDRESSES);
            if(data.success){
                setAddresses(data.addresses);
            };
        };
        fetchAddresses();
    },[]);

    const handleRemove = async(addressId)=>{
        try {
            await axiosInstance.post(POST_ROUTES.DELETE_ADDRESS(addressId));
            setAddresses((prevAddress)=>
                prevAddress.filter((address)=> address.id !== addressId)
            );
            showToast("Address removed successfully", "success");
        } catch (error) {
            showToast(error.response?.data?.error ||  "Failed to remove the address", "error");
        };
    };
    
    const handleSetDefaultAddress = async(addressId)=>{
        try {
            const {data} = await axiosInstance.post(POST_ROUTES.SET_DEFAULT_ADDRESS(addressId));
            if(data.success){

                showToast(data?.message, "success");

                setAddresses(prevAddress=>
                    prevAddress.map((address)=>({
                        ...address,
                        isDefault: address.id ===addressId,
                    }))
                )
            }
        } catch (error) {
            showToast(error.response?.data?.error || "Failed to update default address")
        }
    }
    
    return (
        <div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-black mb-2 m-8">Your Addresses</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 p-4">
                <div className="flex flex-col items-center justify-center  border-2 border-gray-400 border-dashed rounded-md py-10 px-6">
                    <Link to={PATH_URL.ADD_ADDRESS} className="text-gray-500 text-6xl">+</Link>
                    <Link to={PATH_URL.ADD_ADDRESS} className="text-gray-700 text-xl font-semibold">Add Address</Link>
                </div>

                {addresses && addresses.length > 0 ? (
                    addresses.map(address=>(
                        <div key={address.id} className="flex flex-col border-2 border-gray-400 border-dashed rounded-md px-6">
                            <div className='mt-5'>
                                <p>{address.firstName} {address.lastName}</p>
                                <p>{address.address}</p>
                                <p>{address.apartment}</p>
                                <p>{address.city}</p>
                                <p>{address.state}</p>
                                <p>Kenya</p>
                                <p>Phone Number: {address.phoneNumber}</p>
                           </div>
                            <div className='flex justify-between mt-6 mb-4 '>
                                <Link  to={PATH_URL.ADD_ADDRESS} state={{address:address, edit:true}} className='text-blue-400 hover:underline'>Edit</Link>
                                <p>|</p>
                                <button onClick={()=>handleRemove(address.id)} className='text-blue-400 hover:underline'>Remove</button>
                                <p>|</p>
                                <button 
                                    onClick={()=>handleSetDefaultAddress(address.id)}
                                    disabled={address.isDefault} 
                                    className={`text-blue-400 hover:underline disabled:cursor-not-allowed disabled:text-secondary disabled:hover:no-underline`}
                                >
                                    {address.isDefault ? "Default Address" : "Set as Default"}
                                </button>
                            </div>
                        </div>
                    )) 
                ):(<></>)
                }
            </div>


            
        </div>
    );
}

export default Addresses;

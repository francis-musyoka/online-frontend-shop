import React, { useState } from 'react';
import AddAddress from './AddAddress';
import { useToast } from '../../../context/ToastContext';

const SelectAddress = (props) => {
    const {addresses, closeModel, onSelect, selectedLocation, onAddingAddress} =props;
    const [checkOut, setCheckOut] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(selectedLocation);

    const numberOfAddress = addresses.length;
   
    const {showToast} = useToast();
    
    const handleEdit = (address)=>{
        setCheckOut(true)
        setIsEditing(true)
        setEditAddress(address)
    };

    const handleSelect =(address)=>{
        setSelectedAddress(address)
    };

    const handleConfirmSelection = ()=>{
        if(selectedAddress){
            onSelect(selectedAddress);
            closeModel();
        }else{
            showToast("Please select an address")
        }
        
    }


    return (
        <div>
            {checkOut ? (
                <AddAddress CheckOut ={checkOut} onAddingAddress={onAddingAddress} checkAddress= {editAddress} isEditing = {isEditing} editAddressModel={()=>setEditAddress(null)} cancelMode={()=>setCheckOut(false)}/>
            ):(
                <div>
                    <h1 className="font-bold text-lg mb-4">Your Addresses ({numberOfAddress})</h1>
                    {addresses && addresses.length > 0 ? (
                        <div>
                            {addresses.map(address => (
                                <div key={address.id} className="border border-gray-200 p-4 rounded-md flex justify-between items-center mb-3">
                                    <div>
                                        <input 
                                            type="radio" 
                                            className="accent-blue-500" 
                                            checked={selectedAddress?.id === address.id} 
                                            onChange={()=>handleSelect(address)}
                                        />
                                        <label className="pl-3 font-semibold">{address.firstName} {address.lastName}</label>
                                        <p className="pl-7 text-gray-600">{address.address} | {address.apartment} | {address.city}, {address.state}</p>
                                        <p className="pl-7 text-gray-600">{address.phoneNumber}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={()=>handleEdit(address)}
                                            className="text-secondary hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-gray-600 text-lg font-semibold">Oops! No address found.</p>
                            <p className="text-gray-500 mb-4">Click the button below to add a new address.</p>
                            <button 
                                onClick={()=>setCheckOut(!checkOut)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                Add Address
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {addresses?.length > 0 && !checkOut &&(
                <div>
                    <button 
                        onClick={()=>setCheckOut(!checkOut)}
                        className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Add Address
                    </button>
                    <div className="border-t border-gray-200 mt-4 flex justify-between p-4">
                        <button onClick={()=>closeModel()} className="text-gray-500 hover:underline">Cancel</button>
                        <button 
                            onClick={handleConfirmSelection}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Select Address
                        </button>
                    </div>
                </div> 
            )}
            
        </div>

    );
}

export default SelectAddress;

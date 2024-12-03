import React from 'react';

const Orders = () => {
    return (
        <div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-black mb-2 m-8">My Orders</h3>
            
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <p className="mb-2">You have no orders</p>
            </div>

        </div>
    );
}

export default Orders;

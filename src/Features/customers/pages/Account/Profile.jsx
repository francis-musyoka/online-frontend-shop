import React from 'react';
import { useAuth } from '../../../../utils/useContext';

const Profile = () => {
    const {user} = useAuth();
    return (
        <div>
             <h3 className="text-4xl font-bold text-gray-900 dark:text-black mb-2 m-8">Hello {user.firstName}</h3>
            
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-white rounded-lg w-full">
                
            </div>
        </div>
    );
}

export default Profile;

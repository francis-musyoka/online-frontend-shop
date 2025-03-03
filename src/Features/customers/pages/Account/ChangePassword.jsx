import React,{useState}from 'react';
import { useHooks } from '../../../../hooks/useHooks';
import { validateChangePassword } from '../../../../utils/validateForms';
import { axiosInstance, PATCH_ROUTES } from '../../../../constant';
import { useToast } from '../../../../context/ToastContext';


const ChangePassword = ({closeModal, user}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {status:showPassword, handleStatus:handleClick} = useHooks();
    const [formErrors, setFormErros] = useState({});

    const {showToast} = useToast();
    const validateForm = ()=>{
        const errors = validateChangePassword(password,confirmPassword,currentPassword);
        setFormErros(errors)
        return Object.keys(errors).length < 1 
    }
    const handleOnClick = async()=>{
        const isValid = validateForm();
        if(isValid){
            try {
                const response = await axiosInstance.patch(`${PATCH_ROUTES.UPDATE_USER_PASSWORD(user.id)}`,{
                    currentPassword,password,confirmPassword
                })
                console.log(response.data);
                
                if(response.data.success){
                    showToast('Password Changed Successfully', 'success');
                    closeModal();
                }
                 
            } catch (error) {
                showToast(error.response.data.error, 'error')
            }
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                <h4 className="text-lg font-medium mb-4">Change Password</h4>
                <p className="block text-base font-normal text-gray-700 mb-6">
                        Your new password must be different from previous password.
                </p> 
                {/* <hr className='my-3 '/> */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formErrors.currentPassword && <span className="text-red-700 text-xs">{formErrors.currentPassword}</span>}
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formErrors.password && <span className="text-red-700 text-xs">{formErrors.password}</span>}
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formErrors.confirmPassword && <span className="text-red-700 text-xs">{formErrors.confirmPassword}</span>}
                </div>
                <div className="flex justify-start mb-4">
                    <input 
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onClick={handleClick}
                        checked={showPassword}
                    />
                    <label htmlFor="show-password" className="ml-2 block text-sm font-medium text-gray-700">Show Password</label>
                </div>
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={closeModal}
                        className="py-1 px-4 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleOnClick}
                        className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default ChangePassword;

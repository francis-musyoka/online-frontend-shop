import { useEffect, useState } from 'react';
import { validateUpdateForm } from '../../../../utils/validateForms';
import { PATCH_ROUTES } from '../../../../constant';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { useCustomerAuth } from '../../../../hooks/useAppSelectors';
import { fetchUserProfile } from '../../../../redux/actionsCreators/customerAuthActions';
import axiosCustomer from '../../../../utils/axiosCustomer';
import { CircleUserRound } from 'lucide-react';


const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [edit, setEdit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, user } = useCustomerAuth();
    const dispatch = useDispatch();


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserProfile())
        }
    }, [dispatch, isAuthenticated]);


    useEffect(() => {
        if (user) {
            setFirstName(user?.firstName);
            setLastName(user?.lastName);
            setEmail(user?.email)
        }
    }, [user]);


    const validateForm = () => {
        const error = validateUpdateForm(firstName, lastName, email);

        setFormErrors(error);
        return Object.keys(error).length < 1
    }

    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await axiosCustomer.patch(`${PATCH_ROUTES.UPDATE_USER_PROFILE(user.id)}`, {
                    firstName, lastName, email
                })
                if (response.data.success === true) {
                    setEdit(false)
                }

            } catch (error) {
                console.log(error);

            }

        }
    }

    return (
        <>
            <div className="max-w-screen-lg mx-auto mt-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg relative">
                <div className="flex justify-end space-x-4">
                    {edit ? (
                        <>
                            <button
                                type='submit'
                                onClick={() => setEdit(false)}
                                className="py-1 px-4 border border-neutral bg-white text-neutral hover:bg-tertiary"
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className="py-1 px-4 bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEdit(true)}
                            className="py-2 px-4 text-secondary hover:underline rounded-lg"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-4 mt-4">

                    <CircleUserRound className="w-10 h-10 text-gray-600" />

                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="text-sm sm:text-lg text-gray-600">{user?.email}</p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='font-normal font-mono mt-3 py-1 px-2 hover:bg-tertiary border rounded-md shadow-lg '
                        >
                            CHANGE PASSWORD
                        </button>
                    </div>

                </div>


                <div className="mt-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-6">
                        <div className="relative z-0 w-full mb-5 group">
                            {edit ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                            ) : (
                                <span className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900">
                                    {firstName}
                                </span>
                            )}
                            <label
                                htmlFor="firstName"
                                className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                            >
                                First Name
                            </label>
                            {formErrors.firstName && <span className="text-red-700 text-xs">{formErrors.firstName}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            {edit ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                            ) : (
                                <span className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900">
                                    {lastName}
                                </span>
                            )}
                            <label
                                htmlFor="lastName"
                                className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                            >
                                Last Name
                            </label>
                            {formErrors.lastName && <span className="text-red-700 text-xs">{formErrors.lastName}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            {edit ? (
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                            ) : (
                                <span className="block py-2 sm:py-4 px-0 w-full text-sm sm:text-lg text-gray-900">
                                    {email}
                                </span>
                            )}
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 sm:top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
                            >
                                Email address
                            </label>
                            {formErrors.email && <span className="text-red-700 text-xs">{formErrors.email}</span>}
                        </div>


                    </div>
                </div>

            </div>
            {isModalOpen && (
                <ChangePassword
                    closeModal={() => setIsModalOpen(false)}
                    user={user}
                />
            )
            }

        </>

    );
}

export default Profile;

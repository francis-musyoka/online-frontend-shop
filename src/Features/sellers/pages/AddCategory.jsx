import { useState } from 'react';
import { POST_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import axiosShop from '../../../utils/axiosShop';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Please Enter category name')
        } else {
            setError('')
            try {
                const { data } = await axiosShop.post(POST_ROUTES_SHOP.ADD_CATEGORY, { name });
                if (data.success) {
                    setName('');
                    showToast(data.message, 'success')
                }
            } catch (error) {
                showToast(error.response?.data?.error || "Failed to add Category")
            }
        }
    }
    return (
        <div>
            <div className=" flex items-center justify-start px-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
                >
                    <h1 className="text-3xl font-semibold text-center dark:text-neutral mb-6">
                        Add Category
                    </h1>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Category Name'
                            className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {error && <span className="text-red-700 text-xs">{error}</span>}
                    </div>

                    <div className=" flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default AddCategory;

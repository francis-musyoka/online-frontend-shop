import ProductForm from '../components/ProductForm';
import { PATH_URL, POST_ROUTES_SHOP } from '../../../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import axiosShop from '../../../utils/axiosShop';


const AddProduct = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {

        console.log(formData);


        try {
            const response = await axiosShop.post(POST_ROUTES_SHOP.ADD_PRODUCTS, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (response.data.success) {
                showToast('Product was uploaded successfully', 'success');
                navigate(PATH_URL.SELL.MY_PRODUCTS);
            };

        } catch (error) {
            showToast(error.response?.data?.error, 'error')

        };

    };
    return (
        <>
            <ProductForm onSubmit={handleSubmit} isEditing={false} />
        </>
    );
};

export default AddProduct;

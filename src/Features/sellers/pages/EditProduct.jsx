import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_ROUTES_SHOP, PATH_URL, PUT_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../context/ToastContext';
import axiosShop from '../../../utils/axiosShop';


const EditProduct = () => {
    const location = useLocation();
    const { productId } = location.state;
    const [product, setProduct] = useState();


    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            const getProduct = async () => {
                const response = await axiosShop.get(GET_ROUTES_SHOP.CURRENT_PRODUCT_ON_EDIT(productId));
                if (response.data.success) {
                    setProduct(response.data.product);
                }
            }
            getProduct();
        }
    }, [productId]);


    const handleSubmit = async (formData) => {

        try {
            const response = await axiosShop.put(PUT_ROUTES_SHOP.EDIT_PRODUCT(productId), { formData });
            if (response.data.success) {
                showToast("Product updated successfully", 'success')
                navigate(PATH_URL.SELL.MY_PRODUCTS)
            }

        } catch (error) {
            // console.log(error.response.data.error);
            showToast(error.response.data.error)
        }


    }
    return (
        <div>
            <ProductForm onSubmit={handleSubmit} selectedProduct={product} isEditing={true} />
        </div>
    );
}

export default EditProduct;

import React, {  } from 'react';
import ProductForm from '../components/ProductForm';
import { axiosInstance, PATH_URL, POST_ROUTES_SHOP } from '../../../constant';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';


const AddProduct = () => {
    const{showToast} = useToast();
    const navigate = useNavigate();

    const handleSubmit = async(formData) => {

        console.log(formData);
        
        
        try {
            const response = await axiosInstance.post(POST_ROUTES_SHOP.ADD_PRODUCTS,formData,{
                headers: { "Content-Type": "multipart/form-data" }
            })

            if(response.data.success){
                showToast('Product was uploaded successfully', 'success');
                navigate(PATH_URL.SELL.MY_PRODUCTS);
            };        
            
        } catch (error) {
            showToast(error.response?.data?.error, 'error')
            
        };
        
    };
    return (
        <>
            <ProductForm onSubmit = {handleSubmit} isEditing = {false}/>
        </>
    );
};

export default AddProduct;

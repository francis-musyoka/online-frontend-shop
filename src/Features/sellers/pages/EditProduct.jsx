import React from 'react';
import ProductForm from '../components/ProductForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance, PATH_URL, PUT_ROUTES_SHOP } from '../../../constant';
import { useToast } from '../../../utils/ToastContext';


const EditProduct = () => {
    const location = useLocation();
    const{product} = location.state;
      

    const {showToast} = useToast();
    const navigate = useNavigate();


    const handleSubmit = async(formData)=>{
        
        try {
            const response= await axiosInstance.put(PUT_ROUTES_SHOP.EDIT_PRODUCT(product.id),{formData});
            if(response.data.success){
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
            <ProductForm onSubmit = {handleSubmit} selectedProduct = {product}  isEditing = {true}/>
        </div>
    );
}

export default EditProduct;

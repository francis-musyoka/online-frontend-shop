import React, { useState } from 'react';
import { validateProductForm } from '../../../utilis/validateForms';


const ProductForm = (props) => {
    const {isEditing,onSubmit} = props
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        image: [],
        sku: '',
        brand: '',
        condition: '',
        discount: '',
        status: '',
        dimensions: '',
        tags: '',
        rating: 0,
        keyFeatures: '',
    });
    const [formErrors, setFormErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        const imageUrls = files.map((file) => URL.createObjectURL(file)); // Create Object URLs for the selected images
        setProduct((prevState) => ({
            ...prevState,
            image: [...prevState.image, ...imageUrls], // Append new images to the state
        }));
    };
    
    const handleRemoveImage = (index) => {
        const updatedImages = product.image.filter((_, i) => i !== index); // Remove image at specified index
        setProduct({
            ...product,
            image: updatedImages, // Update image state
        });
    };

    const validateForm = (formData)=>{
        const errors = validateProductForm(formData);
        setFormErrors(errors);
        return Object.keys(errors).length<1
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm(product);
        
        if(isValid){
            onSubmit(product)
        }
        
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
               {isEditing ? "Edit Product" : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               
                <div>
                    <label htmlFor="productName" className="block text-gray-700 font-medium">
                        Product Name
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="productName"
                        name="productName"
                        type="text"
                        value={product.productName}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formErrors.productName && <span className="text-red-700 text-xs">{formErrors.productName}</span>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium">
                        Description
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    {formErrors.description && <span className="text-red-700 text-xs">{formErrors.description}</span>}
                </div>
  
                <div>
                    <label htmlFor="keyFeatures" className="block text-gray-700 font-medium">
                        Key Features
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="keyFeatures"
                        name="keyFeatures"
                        value={product.keyFeatures}
                        onChange={handleChange}
                        placeholder="Enter key features separated by commas."
                        rows="4"
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    {formErrors.keyFeatures && <span className="text-red-700 text-xs">{formErrors.keyFeatures}</span>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700 font-medium">
                        Category
                        <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled hidden>Select Status</option>
                        <option value="watches">Watches</option>
                        <option value="electronics">Electronics</option>
                        <option value="smartphones">Smartphones</option>
                    </select>
                    {formErrors.category && <span className="text-red-700 text-xs">{formErrors.category}</span>}
                </div>

               
                <div className="grid md:grid-cols-3 md:gap-6">
                   
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium">
                            Price
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleChange}
    
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.price && <span className="text-red-700 text-xs">{formErrors.price}</span>}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-gray-700 font-medium">
                            Quantity
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={product.quantity}
                            onChange={handleChange}
    
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.quantity && <span className="text-red-700 text-xs">{formErrors.quantity}</span>}
                    </div>

                    <div>
                        <label htmlFor="sku" className="block text-gray-700 font-medium">SKU</label>
                        <input
                            id="sku"
                            name="sku"
                            type="text"
                            value={product.sku}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-gray-700 font-medium">
                            Brand
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            value={product.brand}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.brand && <span className="text-red-700 text-xs">{formErrors.brand}</span>}
                    </div>

                    <div>
                        <label htmlFor="condition" className="block text-gray-700 font-medium">
                            Condition
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                        id="condition"
                        name="condition"
                        value={product.condition}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled hidden>Select Status</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                        {formErrors.condition && <span className="text-red-700 text-xs">{formErrors.condition}</span>}
                    </div>

                    <div>
                        <label htmlFor="discount" className="block text-gray-700 font-medium">Discount (%)</label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            value={product.discount}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-gray-700 font-medium">
                            Status
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={product.status}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                             <option value="" disabled hidden>Select Status</option>
                            <option value="available">Available</option>
                            <option value="out-of-stock">Out of Stock</option>
                            <option value="coming-soon">Coming Soon</option>
                        </select>
                        {formErrors.status && <span className="text-red-700 text-xs">{formErrors.status}</span>}
                    </div>

                    <div>
                        <label htmlFor="dimensions" className="block text-gray-700 font-medium">Dimensions</label>
                        <input
                            id="dimensions"
                            name="dimensions"
                            type="text"
                            value={product.dimensions}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-gray-700 font-medium">
                            Tags
                        </label>
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            value={product.tags}
                            onChange={handleChange}
                            placeholder="Enter tags separated by commas."
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>
                <div>
                        <label className="block text-gray-700">
                            Product Images
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        />
                        {formErrors.image && <span className="text-red-700 text-xs">{formErrors.image}</span>}
                        
                        {product.image.length > 0 && (
                            <>
                                <div className="flex space-x-4 mt-4">
                                    {product.image.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`Product Preview ${index}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-2 text-gray-600">
                                    {product.image.length} {product.image.length === 1 ? 'file' : 'files'} uploaded.
                                </p>
                            </>
                        )}
                    </div> 
                    { isEditing ?(
                        <>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={''}
                                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="mt-6">
                                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                                Add Product
                                </button>
                            </div>
                        </>
                    )}             
                
            </form>
        </div>
    );
};

export default ProductForm;

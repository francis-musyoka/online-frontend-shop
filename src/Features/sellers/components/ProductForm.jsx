import { useEffect, useState } from 'react';
import { validateProductForm } from '../../../utils/validateForms';
import { GET_ROUTES_SHOP } from '../../../constant';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axiosShop from '../../../utils/axiosShop';




const ProductForm = (props) => {
    const [editorStateDescription, setEditorStateDescription] = useState(EditorState.createEmpty());
    const [editorStateKeyFeatures, setEditorStateKeyFeatures] = useState(EditorState.createEmpty());
    const { isEditing, onSubmit, selectedProduct } = props;
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        image: [],
        previewImages: [],
        sku: '',
        brand: '',
        condition: '',
        discount: 0,
        status: '',
        dimensions: '',
        tags: '',
        rating: 0,
        keyFeatures: '',
    });
    const [formErrors, setFormErrors] = useState({})



    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axiosShop.get(GET_ROUTES_SHOP.GET_ALL_CATEGORIES)
            if (response.data.success) {
                setCategory(response.data.categories);
            }
        }
        fetchCategories();
    }, []);



    useEffect(() => {
        if (selectedProduct) {
            const descriptionState = convertFromRaw(JSON.parse(selectedProduct.description));
            const descriptionEditorState = EditorState.createWithContent(descriptionState);
            const keyFeatuersState = convertFromRaw(JSON.parse(selectedProduct.keyFeatures));
            const keyFeatuersEditorState = EditorState.createWithContent(keyFeatuersState);

            setProduct({ ...selectedProduct, category: selectedProduct.categoryId });
            setEditorStateDescription(descriptionEditorState);
            setEditorStateKeyFeatures(keyFeatuersEditorState)
        }
    }, [selectedProduct]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleDescriptionChange = (state) => {
        setEditorStateDescription(state);
        const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
        handleChange({ target: { name: 'description', value: content } })
    }

    const handleKeyFeaturesnChange = (state) => {
        setEditorStateKeyFeatures(state);
        const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
        handleChange({ target: { name: 'keyFeatures', value: content } })
    }




    const handleImageChange = (e) => {
        // Convert FileList to Array
        const files = Array.from(e.target.files);

        // Create  URLs for the selected images
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setProduct((prevState) => ({
            ...prevState,
            image: [...prevState.image, ...files], // Store actual files for backend
            previewImages: [...prevState.previewImages, ...imageUrls], // Store preview images for UI
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = product.image.filter((_, i) => i !== index); // Remove image at specified index
        const updatedPreviewImages = product.image.filter((_, i) => i !== index);
        setProduct({
            ...product,
            image: updatedImages, // Update image state
            previewImages: updatedPreviewImages
        });
    };

    const validateForm = (formData) => {
        const errors = validateProductForm(formData);
        setFormErrors(errors);
        return Object.keys(errors).length < 1
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm(product);

        if (isValid) {
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
                        Description <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 border border-gray-300 rounded-md w-full">
                        <Editor

                            editorState={editorStateDescription}
                            onEditorStateChange={handleDescriptionChange}
                            wrapperClassName="border border-gray-300 rounded-md"
                            editorClassName="p-3 min-h-[100px]"
                            toolbarClassName="border-b border-gray-300"
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                                inline: {
                                    inDropdown: false,
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                                },
                                blockType: {
                                    inDropdown: true,
                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                                fontSize: {
                                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                                fontFamily: {
                                    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                            }}
                        />

                    </div>
                    {formErrors.description && <span className="text-red-700 text-xs">{formErrors.description}</span>}
                </div>

                <div>
                    <label htmlFor="keyFeatures" className="block text-gray-700 font-medium">
                        Key Features
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 border border-gray-300 rounded-md w-full">
                        <Editor

                            editorState={editorStateKeyFeatures}
                            onEditorStateChange={handleKeyFeaturesnChange}
                            wrapperClassName="border border-gray-300 rounded-md"
                            editorClassName="p-3 min-h-[100px]"
                            toolbarClassName="border-b border-gray-300"
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                                inline: {
                                    inDropdown: false,
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                                },
                                blockType: {
                                    inDropdown: true,
                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                                fontSize: {
                                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                                fontFamily: {
                                    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                            }}
                        />

                    </div>
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
                        <option value={''} disabled hidden>Select Category</option>
                        {category.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
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
                            required min="0" max="100"
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
                            <option value="Available">Available</option>
                            <option value="Out-of-Stock">Out-of-Stock</option>
                            <option value="Coming-Soon">Coming-Soon</option>
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

                {
                    !isEditing && (
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

                            {product.previewImages.length > 0 && (
                                <>
                                    <div className="flex space-x-4 mt-4">
                                        {product.previewImages.map((image, index) => (
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
                    )
                }

                {isEditing ? (
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
                ) : (
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

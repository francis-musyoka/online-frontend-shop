import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { axiosInstance, GET_ROUTES, PATH_URL } from '../../../constant';


const Home = () => {

    const [product,setProduct] = useState('');

    useEffect(()=>{
        const fetchProducts = async()=>{
            const response = await axiosInstance.get(GET_ROUTES.GET_ALL_PRODUCTS);
            if(response.data.success){
                setProduct(response.data.products)
            }
            
        };
        fetchProducts();
    },[setProduct]);
   
    

    const navigate = useNavigate()

    const handleClick =()=>{
        navigate(PATH_URL.CART)
    }
   
    return (

        <>
            {product && product.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                    {product.map((product) => (
                        <div key={product.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
                            <Link to={`/${product.productName}`} state={{productDetails:product}} className="bg-white p-4 flex items-center justify-center">
                            <img
                                className="w-full h-auto object-contain"
                                src={product.image && product.image.length > 0 ? `http://localhost:5000${product.image[0]}` : null}
                                alt={product.productName || 'Product Image'}
                            />
                            </Link>
                            <div className="px-5 pb-5">
                                <Link to={`/${product.productName}`} state={{productDetails:product}}>
                                    <h5 className="text-xl font-medium tracking-tight dark:text-neutral mb-2 truncate" title={product.productName}>
                                    {product.productName}
                                    </h5>
                                </Link>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-light text-neutral">
                                    KSH {product.price.toLocaleString()}
                                    </span>
                                    <Button label="Add to Cart" variant="primary" size="medium" onClick={handleClick} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
            <h1 className="text-neutral m-10 text-center">No products</h1>
            )}
        </>
    );
}

export default Home;

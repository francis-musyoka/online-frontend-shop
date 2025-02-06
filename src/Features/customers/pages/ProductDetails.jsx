import React, {  useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import {  BASEURL, PATH_URL } from '../../../constant';

import WishlistButton from '../../../components/WishlistButton';


const ProductDetails = () => {
    const location = useLocation();
    const {productDetails} = location.state;
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(productDetails.image[0]);
    
    

    const handleClick =()=>{
        navigate(PATH_URL.CART)
    }

    return (
        <div>
            <section className="py-12 sm:py-16"> 
                <div className="container mx-auto px-11 bg-white border rounded-lg shadow-lg">
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img className="h-full w-full max-w-full object-cover" src={`http://localhost:5000${selectedImage}`} alt="Product" />
                                    </div>
                                </div>

                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        {productDetails.image.map((img, index) => (
                                            <button 
                                                key={index}
                                                type="button"
                                                onClick={() => setSelectedImage(img)}
                                                className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${selectedImage === img ? 'border-gray-900' : 'border-transparent'}`}
                                            >
                                                <img className="h-full w-full object-cover" src={`${BASEURL}${img}`} alt={`Thumbnail ${index + 1}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 order-last sm:order-last md:order-first">
                            <div className="flex items-center justify-between">
                                <h1 className="text-base font-bold text-gray-900 lg:text-2xl">{productDetails.productName}</h1>
                                <WishlistButton productId={productDetails.id}/>
                            </div>
                            <div className="mt-5 flex items-center space-x-2">
                                <span className="text-base font-semibold text-gray-700">Brand:</span>
                                <Link className="text-sm font-medium text-primary hover:underline">{productDetails.brand}</Link>
                            </div>
                            <div className="mt-10 flex flex-row items-center justify-between border-t border-b py-4 sm:space-x-4 sm:w-full">
                                <div className="flex items-end">
                                    <h1 className="text-xl font-bold lg:text-3xl">KSH {productDetails.price.toLocaleString()}</h1>
                                </div>
                                <Button label="Add to Cart" variant="primary" size="medium" onClick={handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="m-5 ">
                <div className="border-b border-gray-300">
                    <h1 className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                        Description
                    </h1>
                </div>
                <div className="mt-4 flow-root sm:mt-12">
                    <p className="mt-0">{productDetails.description}</p>
                </div>
                <div className="border-b border-gray-300 mt-6">
                    <h1 className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                        Key Features
                    </h1>
                </div>
                <ul className="mt-4 flow-root sm:mt-12 list-disc pl-5 text-gray-700">
                    
                        <li >{productDetails.keyFeatures}</li>
                </ul>
            </div>
        
        </div>
    );
}

export default ProductDetails;






//   {/* <nav class="flex">
//       <ol role="list" class="flex items-center">
//         <li class="text-left">
//           <div class="-m-1">
//             <a href="#" class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </a>
//           </div>
//         </li>

//         <li class="text-left">
//           <div class="flex items-center">
//             <span class="mx-2 text-gray-400">/</span>
//             <div class="-m-1">
//               <a href="#" class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Products </a>
//             </div>
//           </div>
//         </li>

//         <li class="text-left">
//           <div class="flex items-center">
//             <span class="mx-2 text-gray-400">/</span>
//             <div class="-m-1">
//               <a href="#" class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> Coffee </a>
//             </div>
//           </div>
//         </li>
//       </ol>
//     </nav> */}






// {/* <div class="lg:col-span-3">
//                             <div class="border-b border-gray-300">
//                                 <h1 class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </h1>
//                             </div>
//                             <div class="mt-4 flow-root sm:mt-12">
//                                 <p class="mt-0">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
//                             </div>
//                             <div class="border-b border-gray-300">
//                                 <h1 class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Key Features </h1>
//                             </div>
//                             <div class="mt-4 flow-root sm:mt-12">
//                                 <p class="mt-0">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
//                             </div>
                          
//                         </div> */}
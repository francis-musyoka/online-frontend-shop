import React,{useState} from 'react';
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { PATH_URL } from '../../../constant';


const Home = () => {
    const [rating, setRating] = useState(0); 
    const[hoverValue, setHoverValue]= useState(undefined);

    const star = Array(5).fill(0);

    const navigate = useNavigate()
    const handleClick =()=>{
        navigate(PATH_URL.CART)
    }
    
    const products= [
        {
            imageUrl: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111909_series7-480.png",
            productName: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
            price: 10000

        },
        {
            imageUrl: "https://www.phoneplacekenya.com/wp-content/uploads/2023/01/iPhone-15.jpg",
            productName: "iPhone 16 Pro Max 1TB",
            price: 20000

        },
        {
            imageUrl: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/12/4084831/1.jpg?3753",
            productName: "Ramtons RW/154- 7KG Front Load Washing Machine (1YR WRTY)",
            price: 20000

        },
        {
            imageUrl: "https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/46/8987581/1.jpg?0158",
            productName: "Nunix Hair Red Blow Dryer With Beauty Accessories HD-01",
            price: 750

        },

        {
            imageUrl: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/15/224652/1.jpg?6998",
            productName: "Vitron V527 - 2.1 CH Multimedia Speaker, BT/USB/SD/FM - 9000W ",
            price: 4000

        }


    ]
    return (
        <>  
            { products && products.length > 0 ?(
                <div className= "flex flex-wrap">
                    {products.map((product, index)=>(

                        <div  key={index} >
                        <div className="my-8 mx-8 w-full max-w-sm bg-white border  rounded-lg shadow-lg overflow-hidden  ">
                            <Link to="#" className="bg-white p-4 flex items-center justify-center">
                                <img className="w-full h-auto object-contain" src={product.imageUrl} alt={''} />
                            </Link>
                            <div className="px-5 pb-5">
                                <Link to="#">
                                    <h5 className="text-xl font-semibold tracking-tight dark:text-neutral mb-2">{product.productName}</h5>
                                </Link>
                                
                                <div className="flex items-center mt-2 mb-4">
                                    <div className="flex items-center space-x-1">
                                        { star.map((_,index)=>(
                                            <FaStar
                                                key={index}
                                                value={rating}
                                                onChange={(e)=>setRating(e.target.value)}
                                                onClick={()=>setRating(index+1)}
                                                onMouseMove={()=>setHoverValue(index+1)}
                                                onMouseLeave={()=>setHoverValue(undefined)}
                                                className={`cursor-pointer ${(hoverValue || rating) > index ? "text-secondary" : "text-gray-300 dark:text-gray-500" }`}
                                            />
                                        ))
                                        }
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating.toFixed(1)}</span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-medium text-neutral ">Ksh: {product.price.toLocaleString()}</span>
                                    <Button label="Add to Cart" variant="primary" size='medium' onClick={handleClick} /> 
                                </div>
                            </div>
                        </div> 
                        </div>
                    ))}

                  </div>
            ):(
                <>
                <h1 className='text-neutral m-10'>No products</h1>
                </>
            )}
            

        </>
    );
}

export default Home;

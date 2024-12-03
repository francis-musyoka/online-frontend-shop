import React, {  useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const ShowNavbar = ({children}) => {
    const [ShowNavBar, setShowNavBar] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        if(location.pathname.startsWith('/sell')){
            setShowNavBar(false)
        }else{
            setShowNavBar(true)
        }
    },[location])
    return (
        <div>
        {ShowNavBar && children}
        </div>
    );
}

export default ShowNavbar;

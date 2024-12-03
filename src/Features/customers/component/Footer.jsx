import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-neutral text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}  Company Name. All rights reserved.
                </p>
                <div className="mt-2">
                    <Link to='#' className="text-blue-400 hover:underline mx-2">Privacy Policy</Link>
                    <Link to='#' className="text-blue-400 hover:underline mx-2">Terms of Service</Link>
                    <Link to='#' className="text-blue-400 hover:underline mx-2">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

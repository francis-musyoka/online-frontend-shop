import React,{useState} from "react";
import { createContext,useContext } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null); 

    // Function to show toast message
    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null); 
        }, 6000);
    };
    
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast.message} type={toast.type} />}
        </ToastContext.Provider>
    );
};

export default ToastProvider

const Toast = ({ message, type }) => {
    return (
        <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
            style={{ zIndex: 9999 }}
        >
            {message}
        </div>
    );
};

// Custom hook to use toast context
export const useToast = () => {
    return useContext(ToastContext);
};
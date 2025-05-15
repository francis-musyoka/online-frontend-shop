import { axiosInstance, GET_ROUTES, PATCH_ROUTES, PATH_URL, POST_ROUTES } from "../constant";


export const pollTransactionStatus = async(transactionId, showToast,setPollStatus,orderNumber,navigate)=>{
    
    const maxAttempts = 3; // Limit number of retries
    const interval = 30000; // Check every 5 seconds
    setPollStatus('checking')
    const checkStatus = async (attempts = 0 ) => {
        if(attempts > maxAttempts){
            setPollStatus('timeout');
            return
        };
        try {
            const {data} = await axiosInstance.get(GET_ROUTES.GET_MPESA_TRANSACTION_STATUS(transactionId));
            if(data.success){
                if(data.transactionDetails.status === 'completed'){
                    console.log('I am in success Block');
                    
                    showToast("Payment successful! Your order has been placed.", "success");
                    setPollStatus('success');
                    //  await updateOrder(orderNumber,showToast)
                    try {
                        const response = await axiosInstance.patch(PATCH_ROUTES.UPDATE_ORDER(orderNumber));
                        if (response.data.success) {
                            console.log('I Have Updated order successfully');
                            showToast("Order has been successfully updated.", "success");
                            // You can also handle any other logic, such as redirecting or clearing the cart, etc.
                        } 
                    } catch (error) {
                        console.error("Error updating order:", error);
                        
                        showToast("An error occurred while updating your order. Please try again.", "error");
                    };
                    try {
                       const clearCartResponst = await axiosInstance.post(POST_ROUTES.CLEAR_CART);
                       if(clearCartResponst.data.success){
                        console.log('I Have cleara cart successfully');
                       }
                    } catch (error) {
                        
                        console.log("Error clearing cart",error);
                        
                    }
                
                    navigate(PATH_URL.ORDER_SUMMARY)
                    return;

                }else if(data.transactionDetails.status === 'failed'  ){
                    showToast("Payment cancelled. Please try again.", "error");
                    setPollStatus('failed');
                    return;
                }else{
                    setTimeout(()=>checkStatus(attempts+1), interval);
                };
            };
        } catch (error) {
            showToast(error.response?.data?.error || "Error checking transaction status" , "error");
            setPollStatus('failed');
            console.log("Error checking transaction status:", error);
        }
    }

    checkStatus()
};


export const CheckStatusAgain = async(transactionId, showToast,setPollStatus,orderNumber,navigate)=>{
    
        try {
            const {data} = await axiosInstance.get(GET_ROUTES.GET_MPESA_TRANSACTION_STATUS(transactionId));
            if(data.success){
                if(data.transactionDetails.status === 'completed'){
                    setPollStatus('success');
                    //  await updateOrder(orderNumber,showToast)
                    try {
                        const response = await axiosInstance.patch(PATCH_ROUTES.UPDATE_ORDER(orderNumber));
                        if (response.data.success) {
                            console.log('I Have Updated order successfully');
                            showToast("Order has been successfully updated.", "success");
                            // You can also handle any other logic, such as redirecting or clearing the cart, etc.
                        } 
                    } catch (error) {
                        console.error("Error updating order:", error);
                        
                        showToast("An error occurred while updating your order. Please try again.", "error");
                    };
                    try {
                       const clearCartResponst = await axiosInstance.post(POST_ROUTES.CLEAR_CART);
                       if(clearCartResponst.data.success){
                       }
                    } catch (error) {
                        
                        console.log("Error clearing cart",error);
                        
                    }
                    navigate(PATH_URL.ORDER_SUMMARY)
                    return;

                }else if(data.transactionDetails.status === 'failed'  ){
                    showToast("Payment cancelled. Please try again.", "error");
                    setPollStatus('failed');
                    return;
                }else{
                    showToast("Payment was not completed. Please try again.", "error");
                    setPollStatus('failed');
                    return;
                }
            };
        } catch (error) {
            showToast(error.response?.data?.error || "Error checking transaction status" , "error");
            setPollStatus('failed');
            console.log("Error checking transaction status:", error);
        }
    };



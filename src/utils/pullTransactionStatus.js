import { axiosInstance, GET_ROUTES, PATCH_ROUTES, POST_ROUTES } from "../constant";


export const pullTransactionStatus = async(transactionId, showToast,setPollStatus,orderNumber)=>{
    
    const maxAttempts = 3; // Limit number of retries
    const interval = 30000; // Check every 5 seconds
    setPollStatus('checking')
    const checkStatus = async (attempts = 0 ) => {
        if(attempts > maxAttempts){
            showToast("Payment processing timed out. Check your M-Pesa app.", "warning");
            setPollStatus('timeout');
            return
        };
        try {
            const {data} = await axiosInstance.get(GET_ROUTES.GET_MPESA_TRANSACTION_STATUS(transactionId));
            if(data.success){
                if(data.transactionDetails.status === 'completed'){
                    showToast("Payment successful! Your order has been placed.", "success");
                    setPollStatus('success');
                    //  await updateOrder(orderNumber,showToast)
                    try {
                        const response = await axiosInstance.patch(PATCH_ROUTES.UPDATE_ORDER(orderNumber));
                        if (response.data.success) {
                            showToast("Order has been successfully updated.", "success");
                            // You can also handle any other logic, such as redirecting or clearing the cart, etc.
                        } 
                    } catch (error) {
                        console.error("Error updating order:", error);
                        showToast("An error occurred while updating your order. Please try again.", "error");
                    };

                    await axiosInstance.patch(POST_ROUTES.CLEAR_CART);
                
                    return;

                }else if(data.transactionDetails.status === 'failed'  ){
                    showToast("Payment failed. Please try again.", "error");
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


// const updateOrder = async(orderNumber,showToast)=>{
//     try {
//         const response = await axiosInstance.patch(PATCH_ROUTES.UPDATE_ORDER(orderNumber));

//         if (response.data.success) {
//             showToast("Order has been successfully updated.", "success");
//             // You can also handle any other logic, such as redirecting or clearing the cart, etc.
//         } else {
//             showToast("Failed to update the order.", "error");
//         }
//     } catch (error) {
//         console.error("Error updating order:", error);
//         showToast("An error occurred while updating your order. Please try again.", "error");
//     }
// }
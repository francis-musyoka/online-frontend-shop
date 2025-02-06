import { isPasswordValid,isEmailValid, isPhoneNumberValid, isStateValid, isZipCodeValid } from "./index";

export const validateLoginForm = (formData)=>{
    const {email,password} = formData
    const error = {};
    if(!email.trim()){
        error.email = "Please Enter Email"
    }else if(!isEmailValid(email)){
        error.email = "Please Enter Valid Email"
    }

    if(!password.trim()){
        error.password = "Please Enter Password"
    }
 
    return error
};


export const ValidateCreateAccountForm =     (
    firstName = null,
    lastName = null,
    businessName = null,
    businessNumber = null,
    email,
    password,
    confirmPassword
) => {
    const error = {};

    if (firstName !== null && !firstName.trim()) {
        error.firstName = "Please Enter First Name";
    }

    if (lastName !== null && !lastName.trim()) {
        error.lastName = "Please Enter Last Name";
    }

    if (businessName !== null && !businessName.trim()) {
        error.businessName = "Please Enter Business Name";
    }

    if (businessNumber !== null){
        if (!businessNumber.trim()) {
            error.businessNumber = "Please Enter Business Number";
        }else if (!isPhoneNumberValid(businessNumber)) {
            error.businessNumber = "Please Enter Valid Phone Number";
        }
    } 
    

    if (!email.trim()) {
        error.email = "Please Enter Email";
    } else if (!isEmailValid(email)) {
        error.email = "Please Enter Valid Email";
    }

    if (!password.trim()) {
        error.password = "Please Enter Password";
    } else if (!isPasswordValid(password)) {
        error.password = `Password should at least have 1 number, 1 lowercase letter, 1 uppercase letter, 
        1 special character, no space, and it must be 6-16 characters long.`;
    }

    if (password !== confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    }

    return error;
}


export const validateAddressForm = (formData) => {
    const {addressLine1,city,state,zipCode} =formData
    const errors = {};

    if (!addressLine1.trim()) {
        errors.addressLine1 = "Address Line 1 is required.";
    };

    if (!city.trim()) {
        errors.city = "City is required.";
    };

    if (!state.trim()) {
        errors.state = "State is required.";
    } else if (!isStateValid(state)) {
        errors.state = "State should only contain letters.";
    };

    if (!zipCode.trim()) {
        errors.zipCode = "Zip Code is required.";
    } else if (!isZipCodeValid(zipCode)) {
        errors.zipCode = "Zip Code must be in the format 12345 or 12345-6789.";
    }
    
    return errors;
};


export const validate = (formData)=>{
    
    const {email,phoneNumber,shopName} = formData
    const errors = {};

    if (phoneNumber !== null) {
        if (!phoneNumber.trim()) {
            errors.phoneNumber = "Please Enter Phone Number";
        } else if (!isPhoneNumberValid(phoneNumber)) {
            errors.phoneNumber = "Please Enter Valid Phone Number";
        }
    }

    if(!email.trim()){
        errors.email = "Please Enter Email"
    }else if(!isEmailValid(email)){
        errors.email = "Please Enter Valid Email"
    }

    if(!shopName.trim()){
        errors.shopName = "Please Enter Shop Name"
    }else if(shopName.length < 5){
        errors.shopName = "Shop name should have atleast 5 characters"
    }

    return errors
}


export const validateProductForm = (formData) => {
    const errors = {};

    if(!formData.productName.trim()){
        errors.productName = 'Product name is required'
    }
    if(!formData.description.trim()){
        errors.description = 'Product description is required'
    };
    if(!formData.keyFeatures.trim()){
        errors.keyFeatures = 'Add key features'
    }
    
    if( formData.price < 0){
        errors.price = 'Price must be greater than 0'
    }

    console.log(formData.quantity);
    
    if(formData.quantity < 0){
        errors.quantity = 'Quantity must be greater than 0'
    }

    if(!formData.category.trim()){
        errors.category = 'Select category'
    }

    if(!formData.status.trim()){
        errors.status = 'Select status'
    }

    if(!formData.condition.trim()){
        errors.condition = 'Select condition'
    }

    if(!formData.brand.trim()){
        errors.brand = 'Product brand is required'
    }

    if(formData.image.length < 3){
        errors.image = 'Add atleast 3 images'
    }else if(formData.image.length > 5){
        errors.image = "No more than 5 images are allowed"
    }


    return errors;
};

export const validateUpdateForm = (firstName,lastName,email)=>{
    const error = {};
    if(!email.trim()){
        error.email = "Please Enter Email"
    }else if(!isEmailValid(email)){
        error.email = "Please Enter Valid Email"
    }

    if(!firstName.trim()){
        error.firstName = "Please Enter first name"
    }
    if(!lastName.trim()){
        error.lastName = "Please Enter last name"
    }
 
    return error
};

export const validateChangePassword =(password,confirmPassword,currentPassword=null)=>{
    const error ={};
    if (!password.trim()) {
        error.password = "Please enter password";
     }else if (!isPasswordValid(password)) {
        error.password = `Password should at least have 1 number, 1 lowercase letter, 1 uppercase letter, 
        1 special character, no space, and it must be 6-16 characters long.`;
    }
    if (password !== confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    };
    if (currentPassword !== null){
        if(!currentPassword.trim()) {
            error.currentPassword = "Please enter current password";
         }else if (currentPassword === password){
            error.password = "Your new password must be different from current password.";
         }
    } 
     
    return error
};
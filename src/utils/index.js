import { v4 as uuidv4 } from 'uuid';

export const isPasswordValid = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
    return regex.test(password)
};

export const isEmailValid = (email) =>{
    const emailRegex =  /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ 
    const isvalid = emailRegex.test(email);
    return isvalid;
};

 export const isPhoneNumberValid = (phoneNumber)=>{
    const regex = /^07[ -]?\d{1}[ -]?\d{3}[ -]?\d{4}$/;
    const isvalid = regex.test(phoneNumber);
    return isvalid
    
};

export const isStateValid =(state)=>{
    const stateRegex = /^[a-zA-Z\s]+$/
    const isvalid = stateRegex.test(state);
    return isvalid
}

export const isZipCodeValid =(zipCode)=>{
    const zipCodeRegex = /^\d{5}(-\d{4})?$/
    const isvalid = zipCodeRegex.test(zipCode);
    return isvalid
}

export const createGuestId = ()=>{
    let guestId = localStorage.getItem('guestId'); 
    if (!guestId) {
        guestId = uuidv4().replace(/-/g, '');
        localStorage.setItem('guestId',guestId);
    }
    return guestId;
};
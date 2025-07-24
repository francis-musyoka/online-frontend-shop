import { v4 as uuidv4 } from 'uuid';

export const isPasswordValid = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
    return regex.test(password);
};

export const isEmailValid = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const isPhoneNumberValid = (phoneNumber) => {
    const regex = /^7[ -]?\d{1}[ -]?\d{3}[ -]?\d{4}$/;
    return regex.test(phoneNumber);
};

export const isStateValid = (state) => {
    const stateRegex = /^[a-zA-Z\s]+$/;
    return stateRegex.test(state);
};

export const isZipCodeValid = (zipCode) => {
    const zipCodeRegex = /^\d{5}(-\d{4})?$/;
    return zipCodeRegex.test(zipCode);
};

export const createGuestId = () => {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
        guestId = uuidv4().replace(/-/g, '');
        localStorage.setItem('guestId', guestId);
    }
    return guestId;
};

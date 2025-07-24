
import axios from 'axios';
import { BASEURL } from '../constant';

const axiosCustomer = axios.create({
    baseURL: BASEURL,
});

axiosCustomer.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosCustomer;

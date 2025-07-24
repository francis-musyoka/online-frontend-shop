// axiosShop.js
import axios from 'axios';
import { BASEURL } from '../constant';

const axiosShop = axios.create({
    baseURL: BASEURL,
});

axiosShop.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('shopToken'));
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosShop;

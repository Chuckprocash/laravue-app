import axios from "axios";
import router from './router'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use( config => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    config.headers.Authorization = token;
    config.headers.Accept = 'Application/Json';

    return config;
} );

axiosClient.interceptors.response.use((response) => {
    return response;
}, error => {
    if(error.response && error.response.status === 401){
        router.push({name: 'login'});
    }
    throw error;
});

export default axiosClient;
import axios from 'axios';

export const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: '*/*',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

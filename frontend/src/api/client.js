import axios from 'axios';

export const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: '*/*',
    },
});

apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) config.headers.Authorization = `Bearer ${user.token}`;

    return config;
});

import { apiClient } from './index';
import { urls } from '../urls';

export const services = {
    login: async (username, password) => {
        return apiClient.post(urls.login(), {
            username,
            password,
        });
    },
};

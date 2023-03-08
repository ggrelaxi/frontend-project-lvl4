import { apiClient } from './client';
import { urls } from '../urls';

export class AuthServices {
    static async login(username, password) {
        return apiClient.post(urls.login(), {
            username,
            password,
        });
    }

    static async getChatData() {
        return apiClient.get(urls.getChatData());
    }
}

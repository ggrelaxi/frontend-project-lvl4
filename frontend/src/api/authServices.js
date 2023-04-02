import apiClient from './client';
import urls from '../urls';

// eslint-disable-next-line
class AuthServices {
  static async login(username, password) {
    return apiClient.post(urls.login(), {
      username,
      password,
    });
  }

  static async signup(username, password) {
    return apiClient.post(urls.signup(), {
      username,
      password,
    });
  }
}

export default AuthServices;

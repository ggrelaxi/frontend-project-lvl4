import axios from 'axios';
import urls from '../urls';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: '*/*',
  },
});

apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const openedEndpoints = [urls.login(), urls.signup()];
  // eslint-disable-next-line
  if (user && !openedEndpoints.includes(config.url)) config.headers.Authorization = `Bearer ${user.token}`;

  return config;
});

export default apiClient;

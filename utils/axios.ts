import axios from 'axios';

const baseURL = `http://localhost:3000/api`;

const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      return {
        ...acc,
        [name]: value,
      };
    }, {});

    const token = cookies.Authorization || '';

    config.headers['Content-Type'] = 'application/json';
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export default instance;

import axios from 'axios';

const baseURL = `http://localhost:3000/api`;
// const baseURL = 'http://localhost:10.19.223.86'; // 허남준

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    const cookies: { [key: string]: string } = {};

    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    });

    const token = cookies.Authorization || null;

    config.headers['Content-Type'] = 'application/json';
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export default instance;

import axios from 'axios';

import getAuthorization from 'utils/cookieUtil';

const baseURL = `http://localhost:3000/api`;
// const baseURL = 'http://10.19.219.189:2998'; // 허남준

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;

    const token = getAuthorization();

    config.headers['Content-Type'] = 'application/json';
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export default instance;

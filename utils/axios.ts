import axios from 'axios';

import { useCookies } from 'react-cookie';

const baseURL = `http://localhost:3000/api`;

const instance = axios.create({ baseURL });

const [cookies] = useCookies(['Authorization']);

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    const token = cookies.Authorization;

    config.headers['Content-Type'] = 'application/json';
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

export default instance;

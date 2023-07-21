import axios from 'axios';

import getAuthorization from 'utils/cookieUtil';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

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

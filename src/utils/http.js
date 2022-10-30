import axios from 'axios';
import { getToken } from './token';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
http.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    const code = res.data.code || 200;
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data;
    }

    if (code === 401) {
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 500) {
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      return Promise.reject('error');
    } else {
      return Promise.resolve(res.data);
    }
  },
  (err) => {
    console.log('err: ' + err);
    return Promise.reject(err);
  }
);

export default http;

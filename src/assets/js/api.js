import axios from "axios";

const TIMEOUT = 30000,
  xhr = axios.create({
    baseURL: process.env.REQUEST_URL,
    timeout: TIMEOUT,
    withCredentials: true,
    validateStatus(status) {
      // 需要放开，否则后台返回个401之类的 我们拿不到response
      return status >= 200 && status < 500; // default
    }
  });

// 添加请求拦截器
xhr.interceptors.request.use(
  config => config,
  // 请求错误时做些事
  error => Promise.reject(error)
);

// 添加响应拦截器
xhr.interceptors.response.use(
  response => {
    if (+response.status === 200) {
      return response.data;
    }
    return Promise.reject(response.data);
  },
  error => Promise.reject(error)
);

export default xhr;

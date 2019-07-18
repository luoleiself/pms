import axios from "axios";
import router from "../../router";

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
  config => {
    let token = window.sessionStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  // 请求错误时做些事
  error => Promise.reject(error)
);

// 添加响应拦截器
xhr.interceptors.response.use(
  response => {
    switch (+response.data.code) {
      case 10200:
        return response.data;
      case 10401:
        window.sessionStorage.removeItem("token");
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
        }, 300);
        return Promise.reject({ msg: "登陆超时,请重新登陆!" });
      default:
        return Promise.reject(response.data);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default xhr;

const axios = require('axios');

export let headerConfig = {
  headers: { Authorization: 'Bearer' }
}

export const MainAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
});

export const CartAxios = axios.create({
  baseURL: process.env.REACT_APP_API_CART,
  timeout: 300000,
});

export const OrderAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ORDER,
  timeout: 300000,
});


// Add a request interceptor
MainAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
MainAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  return Promise.reject(error);
});

// Add a request interceptor
CartAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
CartAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  return Promise.reject(error);
});

// Add a request interceptor
OrderAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
OrderAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  return Promise.reject(error);
});




export const setBearerToken = (token) => {
  let headers = { Authorization: 'Bearer ' + token };
  headerConfig = { ...headerConfig, headers };
  MainAxios.defaults.headers = headerConfig.headers;
  CartAxios.defaults.headers = headerConfig.headers;
  OrderAxios.defaults.headers = headerConfig.headers;

}


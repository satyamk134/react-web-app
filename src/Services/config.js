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


export const setBearerToken = (token) => {
    let headers = { Authorization: 'Bearer ' + token };
    headerConfig = { ...headerConfig, headers };
    MainAxios.defaults.headers = headerConfig.headers;
    CartAxios.defaults.headers = headerConfig.headers;
    OrderAxios.defaults.headers = headerConfig.headers;

}


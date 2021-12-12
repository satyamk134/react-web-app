const axios = require('axios');

export let headerConfig = {
    headers: { Authorization: 'Bearer' } 
}

export const axiosObj = axios.create({
    baseURL: 'http://localhost:4343/api',
    timeout: 1000,
});

export const setBearerToken = (token)=>{
    let headers = {Authorization:'Bearer '+token};
    headerConfig = {...headerConfig, headers };
    console.log("header config",headerConfig);
    axiosObj.defaults.headers = headerConfig.headers;

}


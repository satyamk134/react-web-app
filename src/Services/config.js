const axios = require('axios');

export let headerConfig = {
    headers: { Authorization: 'Bearer' } 
}

export const axiosObj = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 300000,
});

//'http://localhost:4343/api'

export const setBearerToken = (token)=>{
    let headers = {Authorization:'Bearer '+token};
    headerConfig = {...headerConfig, headers };
    console.log("header config",headerConfig);
    axiosObj.defaults.headers = headerConfig.headers;

}


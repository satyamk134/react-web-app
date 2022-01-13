//http methods as custom methods starts here
import { axiosObj } from './config';

export const  getRequest = (url,params = {})=>{
    console.log("params are",params);
    return axiosObj.get(url,params);
}

export const postRequest = (url, data) => {
    return axiosObj.post(url,data);
}

//http methods as custom methods ends here
//http methods as custom methods starts here
import { MainAxios,CartAxios,OrderAxios } from './config';

/**
 * 
 *Main App
 Cart App
 Order App

 */
export const mainApp = {
    getRequest: (url,params = {})=>{
        console.log("params are",params);
        return MainAxios.get(url,params);
    },

    postRequest: (url, data) => {
        return MainAxios.post(url,data);
    },

    putRequest: (url, data) => {
        return MainAxios.put(url,data);
    },

    deleteRequest: (url, data) => {
        return MainAxios.delete(url,{data:data});
    }
}

export const CartApp = {
    getRequest: (url,params = {})=>{
        console.log("params are",params);
        return CartAxios.get(url,params);
    },

    postRequest: (url, data) => {
        return CartAxios.post(url,data);
    },

    putRequest: (url, data) => {
        return CartAxios.put(url,data);
    },
    deleteRequest: (url, data) => {
        return CartAxios.delete(url,{data:data});
    }
}

export const OrderApp = {
    getRequest: (url,params = {})=>{
        console.log("params are",params);
        return OrderAxios.get(url,params);
    },

    postRequest: (url, data) => {
        return OrderAxios.post(url,data);
    },
    putRequest: (url, data) => {
        return OrderAxios.put(url,data);
    },
    deleteRequest: (url, data) => {
        return OrderAxios.delete(url,{data:data});
    }
}



//http methods as custom methods ends here
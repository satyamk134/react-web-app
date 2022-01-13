
import {getRequest,postRequest} from './http';
export const  getGoogleAuthUrl = ()=>{
    return getRequest('/auth/google');
}

export const getToken = (data)=>{
    return getRequest('/auth/token', {params:{code:data.code}});
}

export const loginGoogleUser = ()=>{
    return postRequest('/auth/authorizeUser');
}

export const login = (data)=>{
    return postRequest('/auth/login', data);
}

export const bookPickupSlot = (data)=>{
    return postRequest('/order/slot', data);
}

export const deocodeJwt = (data)=>{
    return postRequest('auth/token', data);
}

export const getOrdersTobePicked = ()=>{
    return getRequest('order/assign');
}   

export const getOrderDetails = (data)=>{
    return getRequest('/order',{params:data});
}

export const addOrderDetails = (data)=>{
    return postRequest('order', data);
}

export const signup = (data)=>{
    return postRequest('/auth/user',data);
}






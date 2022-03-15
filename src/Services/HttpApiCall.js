
import {mainApp,CartApp, OrderApp} from './http';
export const  getGoogleAuthUrl = ()=>{
    return mainApp.getRequest('/auth/google');
}

export const getToken = (data)=>{
    return mainApp.getRequest('/auth/token', {params:{code:data.code}});
}

export const loginGoogleUser = ()=>{
    return mainApp.postRequest('/auth/authorizeUser');
}

export const login = (data)=>{
    return mainApp.postRequest('/auth/login', data);
}

export const bookPickupSlot = (data) => {
    return OrderApp.postRequest('/order/place-order', data);
}

export const deocodeJwt = (data)=>{
    return mainApp.postRequest('auth/token', data);
}

export const getOrdersTobePicked = ()=>{
    return mainApp.getRequest('order/assign');
}   


export const addOrderDetails = (data)=>{
    return mainApp.postRequest('order', data);
}

export const signup = (data)=>{
    return mainApp.postRequest('/auth/user',data);
}

export const getMerchantList = ()=>{
    return mainApp.getRequest('/merchant');
}

export const validateSessionToken = ()=>{
    return mainApp.postRequest('/auth/token');
}   

export const updateCart = ()=>{
    return mainApp.putRequest('/order/cart');
}

export const getCart = ()=>{
    return CartApp.getRequest('/cart');
}

export const getMerchantServices = ({params})=>{
   return mainApp.getRequest(`/merchant/services/${params.shopId}`,);
}

export const addServiceToCart = (data)=>{
    return CartApp.postRequest("/cart/updateService",data);
 }

export const removeServiceFromCart = (data)=>{
    console.log("data is",data);
    return CartApp.deleteRequest("/cart/updateService",{data:data});
}

export const pushOfflineCart = (data)=>{
    return CartApp.postRequest("/cart/updateManyServices",data);
}

export const getCurrentAssignedOrder = ()=>{
    return OrderApp.getRequest("/order/assigned");
}

export const  orderDetails = {
    get:function(data){
        return OrderApp.getRequest('/order/orderDetails',{params:data});
    },
    add:function (data) {
        return OrderApp.postRequest('/order/particular',data);
    },
    remove:function(data) {  
        return OrderApp.deleteRequest('/order/orderDetails',data)
    },
    edit:function(data) {     
        return OrderApp.putRequest('/order/orderDetails',data);
    },
}

export const  shipment = {
    get:function(data){
        return OrderApp.getRequest('/order/orderDetails',{params:data});
    },
    add:function (data) {
        return OrderApp.postRequest('/order/orderDetails',data);
    },
    remove:function(data) {  
        return OrderApp.deleteRequest('/order/orderDetails',data)
    },
    update:function(data) {     
        return OrderApp.putRequest('/order/shipment',data);
    },

}

export const cart = {
    get:function(data){
        return OrderApp.getRequest('/order/orderDetails',{params:data});
    },
    add:function (data) {
        return OrderApp.postRequest('/order/orderDetails',data);
    },
    delete:function(data) {  
        return CartApp.deleteRequest('/cart/empty',data)
    },
    update:function(data) {     
        return OrderApp.putRequest('/order/shipment',data);
    },
}



export const order = {
    get:function(){
        return OrderApp.getRequest('/order');
    },
    getDetails:function(data){
        return OrderApp.getRequest(`/order/particular/order/${data.orderId}`);
    },
}

export const wishmaster = {
    getDeliveredOrder: ()=>{
        return OrderApp.getRequest('/order/delivered');
    }
}

export const getServicesBookedInOrder = (params)=>{
    return OrderApp.getRequest(`/order/services/${params.orderId}`);
}

export const walletApi = {
    get:()=>{
        return mainApp.getRequest("/wallet/wallet");
    },
    withdraw:(data)=>{
        return mainApp.putRequest("/wallet/withdraw",data);
    }
}

export const merchantServices = {
    getDetails :(params)=>{
        return OrderApp.getRequest(`/order/service/details/${params.serviceId}`);
    }
}

export const addWeighForClothes = (data)=>{
    return OrderApp.postRequest(`order/service/quantity`,data);
}

export const getOrderSummary = (params)=>{
    return OrderApp.getRequest(`order/summary/${params.orderId}`);
}
















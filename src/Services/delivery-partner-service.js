import {mainApp,CartApp, OrderApp} from './http';

export const order = {
    updateStatus : (payload) => {
        return OrderApp.putRequest('/order/shipment/status',payload);
    }
}
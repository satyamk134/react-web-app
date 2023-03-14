
const initialOrderState = {
    orderId:"",
    services:[],
    checkoutValid:"",
    orderDetails:[],
    shopId:"",
    addressId:"",
    pickupTime:"",
    status:""


}

export default function orderReducer(state = initialOrderState, action) {
    switch (action.type) {
        case 'ADD_ALL_SELECTED_SERVICE' : {
            return { ...state, ...{services:action.payload.shopId}}
        }
        case 'REMOVE_SELECTED_SERVICE' : {
            let services = state.services;
            let indexOfService = services.indexOf(action.payload.serviceId);
            services.splice(indexOfService,1);
            return { ...state, ...{services:services}};
        }
        case 'REMOVE_ALL_SELECTED_SERVICE' : {
            return { ...state, ...{services:[]}};
        }

        case 'SERIVICES_CHECKOUT_CLICKED': {
            return { ...state, ...{checkoutValid:action.payload.checkoutValid}};
        }
        case 'ADD_ORDER_DETAIL_SUCCESS':{
            let orderDetails = state.orderDetails;
            orderDetails.push(action.payload);
            return { ...state, ...{orderDetails:orderDetails}};
        }
        case 'EDIT_ORDER_DETAIL_SUCCESS':{
            let orderDetails = state.orderDetails;
            orderDetails.push(action.payload);
            return { ...state, ...{orderDetails:orderDetails}};
        }
        case 'DELETE_ORDER_DETAIL_SUCCESS':{
            let orderDetails = state.orderDetails;
            orderDetails.splice(action.payload.index,1);
            return { ...state, ...{orderDetails:orderDetails}};
        }
        case 'ADD_ORDER_DETAILS_ALL':{
            return { ...state, ...{orderDetails:action.payload}};
        }

        case 'SET_PICKUP_TIME':{
            return { ...state, ...{pickupTime:action.payload.time}};
        }
        case 'SET_PICKUP_ADDRESS':{
            return { ...state, ...{addressId:action.payload.addressId}};
        }
        
        case 'ORDER_PLACED_SUCCESS':{
            return { ...state, ...{status:"SUCCESS",orderId:action.payload.orderId}};
        }

        case 'ORDER_PLACED_ERROR':{
            return { ...state, ...{status:"ERROR"}};
        }
        case 'RESET_ORDER_STATUS':{
            const status = action.payload.status;
            return { ...state, ...{status:status}}
        }

        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



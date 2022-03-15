
const initialCartState = {
    offlineItemCount:0,
    error:false,
    cartId:"",
    cartAction:"",
    cartItem:{},
    addAfterEmpty:false
    
}

export default function cartReducer(state = initialCartState, action) {
    switch (action.type) {
        
        case 'ADD_TO_CART_OFFLINE' : {
            let offlineItemCount = state.offlineItemCount+1;
            return { ...state, ...{offlineItemCount:offlineItemCount}};
        }
        case 'ADD_TO_CART_ERROR':{
            let {error, errorMsg} = action.payload;
            return { ...state, ...{error:error,errorMsg:errorMsg,popUpError:"open"}};
        }
        case 'REMOVE_FROM_CART_OFFLINE' : {
            let offlineItemCount = state.offlineItemCount-1;
            return { ...state, ...{offlineItemCount:offlineItemCount}};
        }
        case 'SAVE_CART_ID':{
            return { ...state, ...{cartId:action.payload.cartId}};
        }
        case 'EMPTY_CART':{
            return { ...state, ...{cartId:action.payload.cartId}};
        }
        case 'SAVE_CART_ITEM':{
            const {serviceId, shopId, merchantName,status} = action.payload;
            return { ...state, ...{cartItem:{
                        serviceId:serviceId,shopId:shopId,
                        merchantName:merchantName,status:status
                        }
                    }
            };
        }

        case 'AFTER_CART_EMPTY': {
            return { ...state, ...{addAfterEmpty:action.payload.addAfterEmpty}};
        }
        

        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



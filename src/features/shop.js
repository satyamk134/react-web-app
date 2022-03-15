
const initialShopState = {
    name:'',
    shopId:''
}

export default function shopReducer(state = initialShopState, action) {
    switch (action.type) {
    
        case 'SET_MERCHANT_NAME': {
            return { ...state, ...{name:action.payload.name}}
        }
        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}




const initialOrderState = {
    isUpdateOrderOpen:false,
    selectedOrderId:0
}

export default function orderReducer(state = initialOrderState, action) {
    switch (action.type) {
        case 'SET_ADD_CLOTH_STATUS': {
            console.log("came to update user state", action);
            return { ...state, ...action.payload }
        };
        
        
        

        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}




const initialAddressState = {
    isAddressUpdated:false,
    isAddressAdded:false,
    isAddressDeleted:false
    
}

export default function addressReducer(state = initialAddressState, action) {
    switch (action.type) {
        
        case 'ADDRESS_UPDATED' : {
            
            return { ...state, ...{isAddressUpdated:action.payload.isAddressUpdated}};
        }
        case 'ADDRESS_ADDED':{
            
            return { ...state, ...{isAddressAdded:action.payload.isAddressAdded}};
        }
        case 'ADDRESS_DELETED': {

            return { ...state, ...{isAddressDeleted:action.payload.isAddressDeleted}};
        }
        

        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



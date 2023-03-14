
const initialSpinnerState = {
    backdrop:false
}

export default function spinnerReducer(state = initialSpinnerState, action) {
    switch (action.type) {
    
        case 'SHOW_BACKDROP': {
            return { ...state, ...{backdrop:true}}
        }
        case 'HIDE_BACKDROP': {
            return { ...state, ...{backdrop:false}}
        }
        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



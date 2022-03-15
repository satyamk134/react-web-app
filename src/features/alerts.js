
const initialAlertState = {
    showSnackbar:false,
    snackbarMsg:'',
    snackbarStatus:'',
    menu:"",
    errorMsg:"",
    errorDialog:false,
    dialogMsg:"" 


}

export default function alertReducer(state = initialAlertState, action) {
    switch (action.type) {
        case 'SHOW_SNACK_ERROR': {
            console.log("came to update user state", action);
            return { ...state, ...{showSnackbar:action.payload.showSnackbar}}
        };
        case 'SET_SNACK_MESSAGE': {
            return { ...state, ...{snackbarMsg:action.payload.snackbarMsg,snackbarStatus:action.payload.snackbarStatus}}
        };
        case 'HIDE_SNACKBAR' :{
            return { ...state, ...{showSnackbar:action.payload.showSnackbar}}
        }
        case 'CHANGE_SIDE_MENU' :{
            return { ...state, ...{menu:action.payload.menu}}
        }
        case 'TOGGLE_DIALOG_ALERT': {
            return { ...state, ...{errorDialog:action.payload.showAlert}}
        }
        case 'ADD_DIALOG_MESSAGE': {
            return { ...state, ...{dialogMsg:action.payload.msg}}
        }
        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



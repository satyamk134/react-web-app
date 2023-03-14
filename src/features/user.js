
const initialUserState = {

    isLoggedIn: false,
    loginStatus:'initial',
    signupStatus:'initial',
    isSignedUp:false,
    validSession:false,
    firstName: 'Sam',
    lastName: 'Kumar',
    role: 'customer',
    emailId: 'satyam@gmail.com',
    token: '',
    isLoginPopupOpen: false,
    isPickupSlotBooked:false,
    currentUrl:"",
    loginButtonClicked:false,
    provider:""
}

export default function loginReducer(state = initialUserState, action) {
    switch (action.type) {
        case 'UPDATE_USER_STATE': {
            console.log("came to update user state", action);
            return { ...state, ...action.payload }
        };
        case 'SET_LOGIN_STATUS': {
            return { ...state, ...action.payload}
        };
        case 'SIGNUP': {
            return { ...state, firstName: action.payload.firstName }
        }
        case 'LOGIN_POPUP': {
            return { ...state, isLoginPopupOpen: action.payload.isLoginPopupOpen }
        }
        case 'PICKUP_SLOT_BOOKED':{
            return { ...state, isPickupSlotBooked: action.payload.isPickupSlotBooked }
        }
        case 'SET_SIGNUP_STATUS':{
            console.log("payload",action.payload);
            return {...state,...{isSignedUp:action.payload.isSignedUp,signupStatus:action.payload.signupStatus}};
        }
        case 'SIDE_OPTION_CHANGE':{
            console.log("payload",action.payload);
            return {...state,...{currentUrl:action.payload.currentUrl}};
        }
        case 'SET_LOGIN_SESSION':{
            return {...state,...{validSession:action.payload.validSession}};
        }
        case 'NEW_ADDRESS_ADDED':{
            return {...state};
        }
        // Do something here based on the different types of actions
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}



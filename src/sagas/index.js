import { put, takeEvery, all,call } from 'redux-saga/effects';
import { login, bookPickupSlot, deocodeJwt, addOrderDetails,signup} from '../Services/HttpApiCall';

function* helloSaga(){
    console.log("Welcome to sagas!!");
}

function* loginUserClick(){
   console.log("login user click called");
}

function* watchLoginClick(){
    const loggedInUSerInfo = yield takeEvery('LOGIN_CLICK', loginUserClick);
  

}

function* setAfterLoginData(){
        yield put({type: 'SET_AFTER_LOGIN_DATA',});
}

function* loginUser(action){
    console.log("login use called",action.payload);
    try{
        let userInfoAfterLogin = yield call(login, action.payload);
        yield put({type:'LOGIN_POPUP',payload:{isLoginPopupOpen:false}});
        yield put({type:'UPDATE_USER_STATE',payload:{...userInfoAfterLogin.data.data,...{isLoggedIn:true,loginStatus:"loggedIn"}}});
    }catch(err){
        console.log("error is",err.message);
        console.log("error is",err.response.data.msg);
        let msg = err.response.data.msg;
        yield put({type:'UPDATE_USER_STATE',payload:{loginStatus:'failed',isLoggedIn:false}});
        yield put({type:'SET_SNACK_MESSAGE',payload:{snackbarMsg:msg,snackbarStatus:"error"}});
        yield put({type:'SHOW_SNACK_ERROR',payload:{showSnackbar:true}});
    }
    
    
}

function* watchLoggedIn(){
    console.log("watch login called");
    yield takeEvery('LOGIN', loginUser);
}

function* bookPikupSaga(action){
    let bookSlotRes = yield call(bookPickupSlot,action.payload);
    yield put({type:"PICKUP_SLOT_BOOKED", payload:{isPickupSlotBooked:true}});
}

function* watchBookPickup (){
    yield takeEvery('BOOK_PICKUP_SLOT', bookPikupSaga);
}

function* decodeJwtToken(action){
    let postLoginInfo = yield call(deocodeJwt, action.payload);
    let loginState = {...postLoginInfo.data, isLoggedIn:true};
    yield put({type:'UPDATE_USER_STATE',payload:loginState});

    
}

function* watchJwtDecode(){
    yield takeEvery('DECODE_JWT', decodeJwtToken);
}

function* addOrderDetailsHandler(action){
    try{
        yield call(addOrderDetails, action.payload);

    }catch(err){
        console.log("Error in adding the order details");

    }
    
    // let loginState = {...postLoginInfo.data, isLoggedIn:true};
    //yield put({type:'UPDATE_USER_STATE',payload:loginState});
}

function* watchAddOrderDetails(){
    yield takeEvery('SAVE_ORDER_DETAILS',addOrderDetailsHandler);
}

function* singupHandler(action){
    try {
        let signupStatus = yield call(signup, action.payload);
        yield put({type:'SET_SIGNUP_STATUS',payload:{signupStatus:'signedUp',isSignedUp:true}});
        //yield put({type:'SET_LOGIN_DETAILS',payload:{signupStatus:'signedUp',isSignedUp:true}});

    } catch (err) {
        
        let msg = err.response.data.msg;
        console.log("msg",msg);
        yield put({type:'SET_SIGNUP_STATUS',payload:{signupStatus:'failed',isSignedUp:false}});
        yield put({type:'SET_SNACK_MESSAGE',payload:{snackbarMsg:msg,snackbarStatus:"error"}});
        yield put({type:'SHOW_SNACK_ERROR',payload:{showSnackbar:true}});
    }
}

function* watchSignup(){
    yield takeEvery('SIGNUP',singupHandler);
}

export  function* rootSaga() {
    yield all([
      helloSaga(),
      watchLoginClick(),
      watchLoggedIn(),
      watchBookPickup(),
      watchJwtDecode(),
      watchAddOrderDetails(),
      watchSignup()
    ])
  }
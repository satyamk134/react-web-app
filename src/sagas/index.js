import { put, takeEvery, all,call } from 'redux-saga/effects';
import { login, bookPickupSlot, deocodeJwt, addOrderDetails} from '../Services/HttpApiCall';

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
        yield put({type:'UPDATE_USER_STATE',payload:userInfoAfterLogin.data.data});
    }catch(err){
        console.log("Error is",err);
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

export  function* rootSaga() {
    yield all([
      helloSaga(),
      watchLoginClick(),
      watchLoggedIn(),
      watchBookPickup(),
      watchJwtDecode(),
      watchAddOrderDetails()
    ])
  }
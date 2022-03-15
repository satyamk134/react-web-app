import { put, takeEvery, all,call } from 'redux-saga/effects';
import store from '../store'
import { login, bookPickupSlot, deocodeJwt, signup, 
validateSessionToken, addServiceToCart, removeServiceFromCart,orderDetails,
cart} from '../Services/HttpApiCall';
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
        yield put({type:'UPDATE_USER_STATE',payload:{...userInfoAfterLogin.data.data,...{isLoggedIn:true,loginStatus:"loggedIn",loginButtonClicked:true}}});
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
    try{
        let bookSlotRes = yield call(bookPickupSlot,action.payload);
        yield put({type:"PICKUP_SLOT_BOOKED", payload:{isPickupSlotBooked:true}});
    }catch(err){
        console.log("you should really think something about this error man.");
    }
   
}

function* watchBookPickup (){
    yield takeEvery('BOOK_PICKUP_SLOT', bookPikupSaga);
}

function* decodeJwtToken(action){
    try{
        let postLoginInfo = yield call(deocodeJwt, action.payload);
        let loginState = {...postLoginInfo.data, isLoggedIn:true};
        yield put({type:'UPDATE_USER_STATE',payload:loginState});
    }catch(error){
        console.log("Error in jwt decode");
    }
    

    
}

function* watchJwtDecode(){
    yield takeEvery('DECODE_JWT', decodeJwtToken);
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

function* loginSessionHanlder(){
    try {
        let validationStatus = yield call(validateSessionToken);
        yield put({type:'SERIVICES_CHECKOUT_CLICKED',payload:{checkoutValid:true}});
    } catch (err) {
        console.log("came inside catch");
        yield put({type:'SET_LOGIN_STATUS',payload:{isLoggedIn:false}});
        yield put({type:"LOGIN_POPUP", payload:{isLoginPopupOpen:true}});
    }
}

function* watchLoginSession(){
    yield takeEvery('CHECK_LOGIN_SESSION',loginSessionHanlder);
}

function* addServiceToCartHandler(action){
    try {
        let addResponse = yield call(addServiceToCart,action.payload);
        const {status} = addResponse.data;
        if(status=='error'){
            yield put({type:'TOGGLE_DIALOG_ALERT',payload:{showAlert:true}}); 
            yield put({type:'ADD_DIALOG_MESSAGE',payload:addResponse.data}); 
            yield put({type:'SAVE_CART_ID',payload:addResponse.data});
        }else{
            yield put({type:'UPDATE_CART_SERVICE_ADD',action}); 
        }
        
        
    } catch (err) {
        yield put({type:'ADD_TO_CART_OFFLINE',action});
        console.log("came inside catch",err);   
    }

}

function* removeServiceFromCartHandler(action){
    try {
        yield call(removeServiceFromCart,action.payload);
        yield put({type:'UPDATE_CART_SERVICE_REMOVE',action});
    } catch (err) {
        yield put({type:'REMOVE_FROM_CART_OFFLINE',action});
        console.log("came inside catch",err);
        
    }
}
function* addFirstItemInCart(action){
    try {
        yield call(addServiceToCart,action.payload);
        yield put({type:'AFTER_CART_EMPTY',payload:{addAfterEmpty:false}});
    }catch (err) {
        yield put({type:'ADD_TO_CART_OFFLINE',action});
        console.log("came inside catch",err);   
    }
}

function* watchAddServiceToCart(){
    yield takeEvery('ADD_SELECTED_SERVICE',addServiceToCartHandler);
    yield takeEvery('REMOVE_SELECTED_SERVICE',removeServiceFromCartHandler);
    yield takeEvery('ADD_CART_FIRST_ITEM',addFirstItemInCart);
    

}

function* addOrderDetails(action){
    try {
        let orderDetailsRes = yield call(orderDetails.add,action.payload);
        yield put({type:'ADD_ORDER_DETAIL_SUCCESS',payload:orderDetailsRes.data.data});
    } catch (err) {
       console.log("error ",err);
        
    }
}
function* deleteOrderDetail(action){
    try {
        console.log("action.payload",action.payload);
        yield call(orderDetails.remove,action.payload);
        yield put({type:'DELETE_ORDER_DETAIL_SUCCESS',payload:action.payload});
    } catch (err) {
       console.log("error ",err);
        
    }
}

function* watchOrderDetails(){
    yield takeEvery('ADD_ORDER_DETAIL',addOrderDetails);
    yield takeEvery('DELETE_ORDER_DETAIL',deleteOrderDetail);
}

function* emptyCartHandler(action){
    yield call(cart.delete,action.payload);
    store.dispatch({'type':"AFTER_CART_EMPTY", payload:{addAfterEmpty:true}});
}

function* watchCartAction(){
    yield takeEvery('EMPTY_CART',emptyCartHandler);
}



export  function* rootSaga() {
    yield all([
      helloSaga(),
      watchLoginClick(),
      watchLoggedIn(),
      watchBookPickup(),
      watchJwtDecode(),
      watchSignup(),
      watchLoginSession(),
      watchAddServiceToCart(),
      watchOrderDetails(),
      watchCartAction()

    ])
  }
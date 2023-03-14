import userReducer from './features/user';
import orderReducer from './features/orders';
import alertReducer from './features/alerts';
import shopReducer from  './features/shop';
import cartReducer from './features/cart';
import spinnerReducer from './features/spinner';
import addressReducer from './features/address'
import { combineReducers } from 'redux'


// export default function rootReducer(state = {}, action) {
//   // always return a new object for the root state
//   return {
//     // the value of `state.todos` is whatever the todos reducer returns
//     user: userReducer(state.user, action),
//     //orders:userReducer()
//   }
// }

export default combineReducers({
  user:userReducer,
  order:orderReducer,
  alert:alertReducer,
  shop:shopReducer,
  cart:cartReducer,
  address:addressReducer,
  spinner:spinnerReducer
})
import * as React from 'react';
import Menu from '../components/MenuComponent';
import  Header from '../Basic-components/Header';
import Login from '../components/Login';
import { Redirect, Route, Switch } from "react-router";
import BookSlot from '../components/BookSlot';
import Profile from '../components/Profile';
import Order from '../components/Orders';
import MyOrders from '../components/MyOrders';
import SnackAlert from '../ui-components/Snackbar';
import Landing from '../components/Merchant/Landing';
import MerchantLanding from '../components/Merchant/Landing';
import {MainAxios,CartAxios,OrderAxios} from '../Services/config';
import { useSelector,useDispatch } from 'react-redux';
import {setBearerToken} from '../Services/config';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function HomeLayout (){
    const dispatch = useDispatch();
    React.useEffect(()=>{
        let cookies = new Cookies();
        let token = cookies.get('token');
        setBearerToken(token);
    })

    MainAxios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log("interceptor called");
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("interceptor called inside error",error);
        //dispatch event for login
        dispatch({type:'SET_LOGIN_STATUS',payload:{isLoggedIn:false, isLoginPopupOpen:true}});
        return Promise.reject(error);
    });

    CartAxios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("interceptor called inside error",error);
        //dispatch event for login
        dispatch({type:'SET_LOGIN_STATUS',payload:{isLoggedIn:false}});
        return Promise.reject(error);
    });
    return (
        <Box sx={{flexGrow: 1}}>
            <Header />  
            <Login />
            <Toolbar/>
            <SnackAlert/>
            <Route exact path="/">
                <Menu />
            </Route>
            <Route  path="/slot-booking">
                <BookSlot />
            </Route>
            <Route  path="/orders">
                <Order />
            </Route>
            <Route  path="/profile">
                <Profile />
            </Route>
            <Route  path="/my-orders">
                <MyOrders />
            </Route>
            <Route  path="/shop/:shopId">
                <MerchantLanding />
            </Route>
        </Box>
            
            
            

    )
}

const  checkIfLoggedIn = ()=> {

}
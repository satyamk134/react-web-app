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
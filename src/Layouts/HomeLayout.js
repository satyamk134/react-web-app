import * as React from 'react';
import Menu from '../components/MenuComponent';
import  Header from '../Basic-components/Header';
import Login from '../components/Login';
import { Redirect, Route, Switch } from "react-router";
import BookSlot from '../components/BookSlot';
import Profile from '../components/Profile';
import Order from '../components/Orders';
import CustomerOrders from '../components/customerOrder/CustomerOrders';
export default function HomeLayout (){
    React.useEffect(()=>{
        console.log("It will be called insode homelayout");
    })
    return (
        <div> 
            <Header />  
            <Login />
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
            <Route  path="/my-orders-agent">
                <CustomerOrders />
            </Route>

            
        </div>
    )
}

const  checkIfLoggedIn = ()=> {

}
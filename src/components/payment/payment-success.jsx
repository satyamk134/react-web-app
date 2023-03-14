import * as React from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
export const PaymentSuccess = ()=>{
    const history = useHistory();
    const location = useLocation()
    console.log("location.state===================>",location.state);
    const {orderId} = location.state;
    useEffect(()=>{
        setTimeout(()=>{
            history.push('/')
        },5000)
    },[])

    return (
        <div>
            <h2>For Order Id - {orderId}</h2>
            <h2>Payment is successfull.Click here to go to your orders.</h2>
            <p>you will be redirected in 5 seconds</p>
        </div>
    )
}
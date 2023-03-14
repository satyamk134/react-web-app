import * as React from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
export const OrderPayment = ()=>{
    const history = useHistory();
    const location = useLocation();
    console.log("location state",location.state);
    useEffect(()=>{
        setTimeout(()=>{
            history.push('/app/order/payment-success',{orderId:location.state.orderId})
        },2000)
    },[])

    return (
        <div>
            <h2>Payment is getting processed, please wait for 2 seconds.</h2>
        </div>
    )
}
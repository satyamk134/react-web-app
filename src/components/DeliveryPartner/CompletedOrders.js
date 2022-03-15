import React, { useState } from "react";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import CompletedOrderCard from './CompletedOrderCard';
import {wishmaster} from '../../Services/HttpApiCall'

export default function CompletedOrders(){

    const[orders,setOrders] = useState([]);

    useEffect(()=>{
        wishmaster.getDeliveredOrder()
        .then(response=>{
            let payloadRes = response.data;
            console.log("payloadRes",payloadRes);
            setOrders(payloadRes.data);
        })
    },[])
    
    return (
        <Box sx ={{display:'flex',flexDirection:'column'}}>
            {
                orders.map(element=>(
                    <CompletedOrderCard deliveredItem={element} />
                ))
            }
           
        </Box>
    )
}
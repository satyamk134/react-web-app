import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MyOrderList from './MyOrderList';
import { useEffect,useState } from 'react';
import {order} from '../../Services/HttpApiCall'
export default function MyOrders() {

  let [orders,setOrders] = useState([]);
  useEffect(()=>{
    order.get()
    .then(response=>{
        setOrders(response.data.data);
    })
  },[])
  return (
   <MyOrderList orders={orders}/>
  );
}

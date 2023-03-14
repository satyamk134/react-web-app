import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {getCurrentAssignedOrder} from '../../Services/HttpApiCall';

export default function CurrentOrder() {



  let [order, setOrder] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    getCurrentAssignedOrder()
    .then(response=>{
        console.log(response.data);
        let firstOrder = response.data.slice(0,1);
        setOrder(firstOrder);
    })
    .catch(err=>{
        console.log("Error in getting orders",err);
    })
  },[]);

  const acceptOrderHandler = (orderId)=>{
    history.push('/app/delivery/current-order/'+orderId);
  }

  return (
    <Box>
        {order.map((element,id)=><Card key={id} sx={{ maxWidth: 345 }}>
           
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Order No - {element.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      Address: 142 1st C Main HSR Layout, Sector-1,Bangalore
                  </Typography>
              </CardContent>
              <CardActions sx={{ maxWidth: 345,p:2 }}>
                  <Button variant="outlined" color="success" onClick={acceptOrderHandler.bind(this,element.orderId)}>ACCEPT</Button>
                  <Button variant="outlined" color="error">REJECT</Button>
              </CardActions>
        </Card>)}
        
    </Box>
    
    
  );
}

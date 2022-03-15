import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react'; 
import Box from '@mui/material/Box';
import OrderStepper from './OrderStepper';
import OrderDetails from './OrderDetails';
import {order} from '../../Services/HttpApiCall'
import { useHistory } from 'react-router-dom';
export default function MyOrderList({orders}) {

  const [openOrderDetail,setOrderDetail] = useState(false);
  const [servicesWithDetail, setServicesWithDetail] = useState([]);
  const history = useHistory();
  const viewOrderDetails = (orderDetail)=>{

    const {id} = orderDetail;
    history.push(`/app/my-order/all-orders/${id}`)
    // order.getDetails({orderId:id})
    // .then(response=>{
    //   setServicesWithDetail(response.data.payload);
    //   setOrderDetail(true);
    // })
  }
  return (
    <Box>
      {orders.map(((element,index)=><Card sx={{ maxWidth: '50%',mt:'10px' }}>
          <CardContent sx={{display:'flex',justifyContent:'space-between'}}>
            <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {element.merchantName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ORDER NO.  {element.id}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6" color="text.warning">
                  Rs. 3232
                </Typography>
                <Button variant="outlined" color="success">PAY NOW</Button>
                {/* <Typography variant="body2" color="text.secondary">
                  Bill will be generated once order is collected
                </Typography> */}
            </Box>
            
            
          </CardContent>
        <CardActions >
          { index==0 && 
                <Box sx = {{display:'flex',flexDirection:'column'}}>
                  <OrderStepper />
                  <ListAction />
                </Box>
                
          }
          <Button onClick={viewOrderDetails.bind(this, element)}>View Details</Button>
        </CardActions>
      </Card>))
      }
      <OrderDetails 
        openOrderDetail={openOrderDetail}
        setOrderDetail={setOrderDetail} 
        servicesWithDetail={servicesWithDetail}
      />
    </Box>
    
  );
}

function ListAction(){
    return(
      <Box sx={{"mt":"15px"}}>
        <Button size="small" variant="outlined" color="primary" >
          RATE
        </Button>
        <Button size="small" variant="outlined" color="error" sx={{ml:'10px'}}>
          CANCEL
        </Button>
      </Box>
    )
}

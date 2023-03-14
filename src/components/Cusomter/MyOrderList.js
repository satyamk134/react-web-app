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
import { order } from '../../Services/HttpApiCall'
import { useHistory, Link } from 'react-router-dom';
import '../css/MyOrderList.css';
export default function MyOrderList({ orders }) {

  const [openOrderDetail, setOrderDetail] = useState(false);
  const [servicesWithDetail, setServicesWithDetail] = useState([]);
  const history = useHistory();
  const viewOrderDetails = (orderDetail) => {
    const { id } = orderDetail;
    history.push(`/app/my-order/all-orders/${id}`)
  }
  return (
    <Box>

      {
        orders.map(element => (
          <div>
            <div className="order-list-headers">
              <h3>{element.merchantName}</h3>
              <h3>Order No - {element.id}</h3>
              <Link to={'/my-account/all-orders/'+element.id}><h4>View Details</h4></Link>
            </div>
            
            <ol class="items__header">
              <li>
                Services
              </li>
              <li>
                Details
              </li>
              <li>
                No. of Items
              </li>
            </ol>
            {element.OrderServices.map(service => (
                <ol class="items__body">
                  <li>
                      {service.name}                    
                  </li>
                  <li>
                    <Link to="/">
                      View More 
                    </Link>
                  </li>
                  <li>
                    2
                  </li>
                </ol>
                )
              )
            }
          </div>
        )
        )
      }
    </Box>

  );
}

function ListAction() {
  return (
    <Box sx={{ "mt": "15px" }}>
      <Button size="small" variant="outlined" color="primary" >
        RATE
      </Button>
      <Button size="small" variant="outlined" color="error" sx={{ ml: '10px' }}>
        CANCEL
      </Button>
    </Box>
  )
}

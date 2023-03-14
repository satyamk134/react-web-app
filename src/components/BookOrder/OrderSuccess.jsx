import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';
import { useHistory ,Link} from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { order } from '../../Services/HttpApiCall';


import '../css/order-success.css'

export default function BasicCard() {

  const history = useHistory()
  const dispatch = useDispatch()
  const [selectedServices, setSelectedServices] = useState([])

  const resetOrderStatus = () => {
    dispatch({ type: 'RESET_ORDER_STATUS', payload: { status: "" } })
  }
  const gotToHome = () => {
    history.push('/')
    resetOrderStatus()
  }
  const goToMyOrders = () => {
    history.push('/my-account/all-orders')
    resetOrderStatus()
  }
  const getOrderSummary = async () => {
    const servicesSelectedRes = await order.getLastestOrderSummary();
    setSelectedServices(servicesSelectedRes.payload)
  }
  const orderState = useSelector(state=>state.order);
  useEffect(getOrderSummary, [])

  return (
    <div className='order-summary-wrapper'>
      <div className='order-summary'>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography className="center" variant="h5" color="text.primary">
              ORDER NO - {orderState.orderId}
            </Typography>
            <p>
              Your order has been placed successfully. Click <Link to="app/my-orders">here</Link> to see the recent order detail.
            </p>

            <p>Selected Services </p>
            <ol>
              {
                selectedServices.map(element => (<li>{element.name}</li>))
              }

            </ol>

            <div>
              <p>
                PICK UP ADDRESS - 142 1st C Main, HSR Layout Sector-1, Bangalore- 560102
              </p>

            </div>
          </CardContent>
          <CardActions className='order-summary-actions'>
            <Button color="primary" onClick={gotToHome} size="small">ORDER MORE</Button>
            <Button color="secondary" onClick={goToMyOrders} size="small">MY ORDERS</Button>
          </CardActions>
        </Card>
      </div>

    </div>

  );
}

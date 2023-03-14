import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import AddedItemList from './AddedItemList';
import AddItemForm from './AddItemForm';
import OrderStepper from './OrderStepper'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import OrderActions from './OrderStepperActions'
import '../css/current-order-form.css'
import { useDispatch } from 'react-redux';
import {order} from '../../Services/delivery-partner-service';
import Journey from './Journey'
import Confirmation from './Confirmation';
import ClothesCollection from './ClothesCollection';
export default function CurrentOrderForm() {

  console.log("currebt order form loaded-=================>>>>>>>>>>>")
  
  const [activeStep,setActiveStep] = useState(0)
  const {orderId} =  useParams();
  const steps = ['On the way to Customer', 'Clothes Collection','Going to shop','Drop Confirmation'];

  let stepperNextCallBack = () => {
    //call the next end point 
    //update the order status
    console.log("active step is=======>",activeStep)
    if(activeStep == 0) {
      return async () => {
        await order.updateStatus({orderId:orderId,status:'PICK_UP_PARTNER_ARRIVED'});
        setActiveStep(1);
       
      }
    } else if(activeStep == 1) {
      return async () => {
        await order.updateStatus({orderId:orderId,status:'PICKED_FROM_CUST'});
        setActiveStep(2);
        
      }
    } else if(activeStep == 2) { 
        return async () => {
          await order.updateStatus({orderId:orderId,status:'MOVING_TO_SHOP'});
          setActiveStep(3);
          
        }
    } else if(activeStep == 3) {
      return async () => {
        await order.updateStatus({orderId:orderId,status:'DROP_AT_SHOP_COMPLETE'});
        setActiveStep(4);
        
      }
    }
  }

  
  const currentStepHtml = () => {
      console.log("current html called====>");
      if(activeStep == 0) {
          const props = {
            status : 'MOVE_TO_CUST',
            source:'142 1st c Main',
            destination:'12th Main, Church street Phelendopia'
          }
          return <Journey  details = {props}/>
      } else if(activeStep == 1) {
        return <ClothesCollection />
      } else if(activeStep == 2) {
          const props = {
            status : 'MOVE_TO_CUST',
            source:'142 1st c Main',
            destination:'12th Main, Church street Phelendopia'
          }
          return  <Journey details={props}/>
      }else if(activeStep == 3) {
          return  <Confirmation />
      }
  }

  return (
    <Box className="current_order_wrapper">
      <Box>
           <OrderStepper orderId={orderId} activeStep = {activeStep} steps={steps}/>
      </Box>
      { currentStepHtml() }
      <Box>
          <OrderActions 
            activeStep = {activeStep} 
            setActiveStep={setActiveStep} 
            isStepSkipped={false} steps={3}
            handleNext={stepperNextCallBack()}
          />
      </Box>
    </Box>
  );
}

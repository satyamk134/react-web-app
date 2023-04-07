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
import { getCurrentAssignedOrder } from '../../Services/HttpApiCall';
export default function CurrentOrderForm() {

  console.log("currebt order form loaded-=================>>>>>>>>>>>")
  
  const [activeStep,setActiveStep] = useState(0)
  const {orderId} =  useParams();
  const [loading,setLoading] = useState(false)
  const [currentOrder,setCurrentOrder] = useState({status:'PICKUP_ASSIGNED'}); 
  const steps = ['On the way to Customer', 'Clothes Collection','Going to shop','Drop Confirmation'];

  let stepperNextCallBack = () => {
    //call the next end point 
    //update the order status
    console.log("active step is=======>",activeStep)
    if(activeStep == 0) {
      return async () => {
        try{
          setLoading(true)
          await order.updateStatus({orderId:orderId,status:'PICKUP_ARRIVED'});
          setLoading(false)
          setActiveStep(1);
        }catch(err){
          console.log("error is",err);
        }
        
       
      }
    } else if(activeStep == 1) {
      return async () => {
        setLoading(true)
        /**pickup from customer */
        await order.updateStatus({orderId:orderId,status:'PICKUP_CUST_DONE'});
        setActiveStep(2);
        setLoading(false)
        
      }
    } else if(activeStep == 2) { 
        return async () => {
          setLoading(true)
          /**pickup arrived at shop */
          await order.updateStatus({orderId:orderId,status:'PICKUP_SHOP'});
          setActiveStep(3);
          setLoading(false)
          
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

  useEffect(()=>{
    getCurrentAssignedOrder()
    .then(response=>{
      const {data} = response;
      if(data.status === 'PICKUP_ASSIGNED') {
        setActiveStep(0)

      } else if (data.status === 'PICKUP_ARRIVED') {
        setActiveStep(1)

      } else if (data.status === 'PICKUP_A1') {
        setActiveStep(2)

      } else if (data.status === 'PICKUP_A2') {
        setActiveStep(3)

      }

    })
    .catch(err=>{
        console.log("Error in getting orders",err);
    })
    
  },[])

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
            loading={loading}
            handleNext={stepperNextCallBack()}
          />
      </Box>
    </Box>
  );
}

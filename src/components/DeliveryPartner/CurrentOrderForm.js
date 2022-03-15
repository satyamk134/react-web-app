import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import {getServicesBookedInOrder,merchantServices} from '../../Services/HttpApiCall';
import { useHistory, useParams } from 'react-router-dom';
import AddedItemList from './AddedItemList';
import AddItemForm from './AddItemForm';
import OrderStepper from './OrderStepper'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
export default function CurrentOrderForm() {


  const [bookedServices,setBookedServices] = useState([]);
  const [selectedService, setSelectedService]= useState(0);
  const [displayedService,setDisplayedService]  = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [servicesLoaded,setServicesLoaded] = useState(false);
  const [particulars, setParticulars] = useState([]);
  const [unit, setUnit] = useState('kg');
  const {orderId} =  useParams();
  console.log("order id",orderId);
  useEffect(()=>{
    getServicesBookedInOrder({orderId:orderId})
    .then(response=>{
      if(response){
        console.log("response data data",response.data.data);
        setBookedServices(response.data.data);
        setDisplayedService(response.data.data[0]);
        setServicesLoaded(true);
      }
      console.log("gettting assigned order",response);
    })
    .catch(err=>{
      console.log("error ing getting the current order",err);
    })

  },[]);

  useEffect(()=>{
    if(servicesLoaded == true){
      selectService({target:{value:0}});
    }
    
  },[servicesLoaded])

  const selectService = (event)=>{
    console.log("Called");
    let index = event.target.value; 
    console.log("index is",bookedServices);
    let serviceId = bookedServices[index].id;
    merchantServices.getDetails({serviceId:serviceId})
    .then(response=>{
      let currentService =response.data.payload.services;
      setServiceOptions(response.data.payload.services.serviceDetail);
      setParticulars(response.data.payload.particulars.particulars);
      setUnit(currentService.unit);
    })
    setSelectedService(index);
    setDisplayedService(bookedServices[index]);
    
  }

  


  return (
    <Box sx={{display:'flex'}}>
        
     
        <Box sx={{flexGrow:"9"}}>
            <Box sx={{mt:"20px"}}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item  p={2} xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Service</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedService}
                      label="service"
                      onChange={selectService}
                      
                    >
                      {
                        bookedServices.map((element,index)=>(<MenuItem value={index}>{element.name}</MenuItem>))
                      }
                      
                    </Select>
                  </FormControl>
                </Grid>
                
              </Grid>
            </Box>

            <Box sx={{display:'flex'}}>
                <Box sx={{flexGrow:1}}>
                  {displayedService.serviceName}
                </Box>
                <Box sx={{flexGrow:4}}>
                  <Box sx={{ width:"70%"}}>
                    <AddItemForm 
                    serviceOptions={serviceOptions} 
                    orderId={orderId} 
                    serviceName={displayedService.name} 
                    serviceId={displayedService.id} 
                    unit={unit}
                    particulars={particulars}
                    setParticulars={setParticulars}
                    
                    />
                  </Box>
                
                  <AddedItemList 
                    unit={unit} 
                    orderId={orderId} 
                    serviceId={displayedService.id} 
                    particulars={particulars}
                  />
                </Box>
            </Box>
        </Box>

        <Box sx={{flexGrow:"1"}}>
           <OrderStepper orderId={orderId} />
        </Box>
        
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import AddItemForm from './AddItemForm';
import { getOrderSummary, merchantServices } from '../../Services/HttpApiCall';
export default function ClothesCollection(props) {

    const [bookedServices, setBookedServices] = useState([]);
    const [selectedService, setSelectedService] = useState(0);
    const [displayedService, setDisplayedService] = useState([]);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [particulars, setParticulars] = useState([]);
    const [activeStep, setActiveStep] = useState(1)
    const [clothes, setClothes] = useState([])
    const dispatch = useDispatch()
    const [unit, setUnit] = useState('kg');
    const { orderId } = useParams();

    useEffect(async () => {
        /**
         * fetch order services and shipment/order status
        */
        const orderSummary = await getOrderSummary({ orderId: orderId })
        setBookedServices(orderSummary.payload.OrderServices);
    
    }, []);

    useEffect(()=>{
        //select the first service once loaded
        if(bookedServices.length >0){
            selectService({target:{value:0}})
        }
    },[bookedServices])

    const selectService = (event) => {
        let index = event.target.value;
        let serviceId = bookedServices[index].id;
        setClothes([])
        merchantServices.getDetails({ serviceId: serviceId })
            .then(response => {
                let currentService = response.payload.services;
                setClothes(currentService.serviceDetail)
            })
        setSelectedService(index);
        setDisplayedService(bookedServices[index]);
    }

    return (
        <Box>
            <Box sx={{ mt: "20px" }}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item p={2} xs={3}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">Service</InputLabel>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectedService}
                                onChange={selectService}
                                label="service"
                            >
                                {
                                    bookedServices.map((element, index) => (<MenuItem key={index} value={index}>{element.name}</MenuItem>))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 4 }}>
                    <Box >
                        {
                            clothes.length > 0 &&
                            <AddItemForm
                                clothes={clothes}
                                orderId={orderId}
                                serviceName={displayedService.name}
                                serviceId={displayedService.id}
                                setParticulars={setParticulars}
                            />
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

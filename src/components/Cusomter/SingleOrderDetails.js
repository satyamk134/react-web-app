import * as React from 'react';
import PropTypes, { element } from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceCharges from './ServiceCharges';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import OrderStepper from './OrderStepper'
import { getOrderSummary } from '../../Services/HttpApiCall';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import './customer.scss';

export default function SingleOrderDetails(props) {
    const history = useHistory()
    const { orderId } = useParams(); 

    let intialSummary = {
        merchantName: "",
        status: "",
        createdAt: "",
        id: "",
        paymentStatus:"",
        OrderServices: [
            {
                serviceDetail: [
                    {
                        price: 0,
                        cloth: ""
                    }
                ],
            }
        ]
    } 
    const filterClothesTypes = (clothesForService,filterKey)=>{
        return clothesForService.filter(element=>element.unit == filterKey && element.count>0)
    }

    const [orderSummary, setOrderSummary] = useState(intialSummary);

    useEffect(() => {
        getOrderSummary({ orderId: orderId })
            .then(response => {
                setOrderSummary(response.payload);
                
            })
    }, []);
    const payForOrderHandler = () => {
        history.push('/app/order/payment/',{orderId:orderId})
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Box>
                    <Box>
                        <Divider />
                        <ul className='order-menu'>
                            <li>
                                <li class="order-sub-menu">Order Number</li>
                                <li>{orderSummary.id}</li>
                            </li>
                            <li>
                                <li class="order-sub-menu">Order Date</li>
                                <li>{moment(orderSummary.createdAt).format("ll")}</li>
                            </li>
                            <li>
                                <li class="order-sub-menu">Payment</li>
                                <li>visa - 4543</li>
                            </li>
                            <li>
                                <li class="order-sub-menu">Status</li>
                                <li>{orderSummary.status}</li>
                            </li>
                        </ul>
                        <Divider />
                    </Box>

                    <div className="amount__paynow">
                        
                            <p>
                                Bill Amount 
                            </p>
                            <div>
                                <span className="amount__paynow__amount">Rs 342</span>
                            </div>
                            {
                            orderSummary.paymentStatus == 'PAID'?
                            <p class="success-color" >
                                PAID
                            </p>:
                            <Button variant="outlined" color="success" onClick={payForOrderHandler}>
                                PAY NOW
                            </Button>
                        
                            }
                            
                       
                       
                    </div>
                    <Box>
                        <div className='order__merchant'>
                            <h4>{orderSummary.merchantName}</h4>
                        </div>
                        
                        
                        <ul className='order-services'>
                            {
                                orderSummary.OrderServices.map(element=>(
                                    <div>
                                         <li class="each-order-service">
                                            <p>{element.name}</p>
                                        </li>
                                        <ClothesInsideService 
                                            particulars={filterClothesTypes(element.serviceDetail,'PER_KG')} 
                                            clothType="MISC CLOTHES" 
                                            serviceCost={element.price}
                                            unit="PER_KG"
                                            weight="5"
                                        />
                                        <ClothesInsideService 
                                            particulars={filterClothesTypes(element.serviceDetail,'PER_ITEM')} 
                                            clothType="SPECIAL CLOTHES" 
                                            serviceCost={element.price}
                                            unit="PER_ITEM"
                                            weight="5"
                                        />
                                        
                                    </div>
                                    )
                                )
                            }
                        </ul>
                    </Box>
                    
                </Box>
            </Grid>

            <Grid item xs={4}>
                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                    <OrderStepper orient="vertical" />
                </Box>
            </Grid>
        </Grid>
    );
}

const ClothesInsideService = ({particulars,clothType,serviceCost,unit, weight})=>{
    console.log("clothes particulars are",particulars);
    if(particulars.length>0){
        return (
            <div>
                <h5>{clothType}</h5>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Cloth Name</TableCell>
                            <TableCell align="right">List Price&nbsp;(Rs.)</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Cost</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {particulars.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.cloth}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">{row.count*row.price}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ServiceCost particulars={particulars} serviceCost={serviceCost} unit={unit} weight={weight}/>
            </div>

        )
    }
    return <></>
}

const ServiceCost=({particulars, serviceCost, unit,weight}) => {
    let cost = 0
    if(unit == "PER_KG"){
        cost = serviceCost*weight;
    }else{
        particulars.forEach(element=>{
            console.log("element",element)
            cost = cost +parseInt(element.count)*parseInt(element.price)
            console.log("cost ",cost);
        })
    }
    
    
    return(
        <div>
            Cost for above clothes = {cost}
        </div>
    )
}

import * as React from 'react';
import PropTypes from 'prop-types';
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
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceCharges from './ServiceCharges';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import OrderStepper from './OrderStepper'
import { getOrderSummary } from '../../Services/HttpApiCall';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import './customer.scss'
export default function SingleOrderDetails(props) {
    const { orderId } = useParams();
    let secondary = "";

    let intialSummary = {
        merchantName: "",
        status: "",
        createdAt: "",
        id: "",
        OrderServices: [
            {
                particulars: [{
                    serviceDetail: {
                        price: 0,
                        cloth: ""
                    }
                }],
            }
        ]
    }

    const [orderSummary, setOrderSummary] = useState(intialSummary);

    useEffect(() => {
        getOrderSummary({ orderId: orderId })
            .then(response => {
                setOrderSummary(response.data.payload.orderSummary);
            })
    }, []);

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
                                <li>master - 4543</li>
                            </li>
                            <li>
                                <li class="order-sub-menu">Status</li>
                                <li>{orderSummary.status}</li>
                            </li>
                        </ul>
                        <Divider />
                    </Box>

                    <Box>

                    </Box>
                    <Box>
                        <p>{orderSummary.merchantName}</p>
                        
                        <ul className='order-services'>

                            <li class="each-order-service">
                                <h4>Service Name</h4>
                                <h4>No. of Cloth</h4>
                                <h4>Unit</h4>
                            </li>
                            {
                                orderSummary.OrderServices.map(element=>(
                                    <li class="each-order-service">
                                        <p>{element.name}</p>
                                        <p>{element.particulars.length}</p>
                                        <p>{element.unit}</p>
                                    </li>
                                    )
                                )
                            }
                        </ul>
                    </Box>
                    <Box>

                        <Box>
                            {
                                orderSummary.OrderServices
                                    .map((element, index) => (
                                        <Box>
                                            <p>{element.name}</p>
                                            <ServiceCharges service={element} />
                                        </Box>)
                                    )
                            }

                        </Box>

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

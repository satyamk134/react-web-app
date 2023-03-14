import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import  Header from '../Basic-components/Header';
import { Redirect, Route, Switch } from "react-router";
import BookSlot from '../components/BookSlot';
import CurrentOrder from '../components/DeliveryPartner/CurrentOrder';
import SideDrawer from '../Basic-components/SideDrawer'
import CompletedOrders from '../components/DeliveryPartner/CompletedOrders';
import CurrentOrderForm from '../components/DeliveryPartner/CurrentOrderForm';
import MyOrders from '../components/Cusomter/MyOrders'
import SingleOrderDetails from '../components/Cusomter/SingleOrderDetails'
import Wallet from '../components/Wallet/Wallet';
import Withdraw from '../components/Wallet/Withdraw';
import SelectAddress from '../components/BookOrder/addressSelector';
import OrderSuccess from '../components/BookOrder/OrderSuccess';
import {OrderPayment} from '../components/payment/order-payment';
import {PaymentSuccess} from '../components/payment/payment-success';
export default function AppLayout() {

    
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header  position="fixed" />
      <Box component="main" sx={{flexGrow: 1, p: 3,width: '95%', backgroundColor:"ebedee" }}>
        <Route path="/app/slot-booking">
            <BookSlot />
        </Route>
        <Route path="/app/select-address">
            <SelectAddress />
        </Route>
        <Route path="/app/order-success">
            <OrderSuccess />
        </Route>
        
        <Route exact path="/app/delivery/current-order/:orderId">
            <CurrentOrderForm />
        </Route>
        <Route exact path="/app/delivery/current-order">
            <CurrentOrder />
        </Route>
        <Route exact path="/app/my-account/current-order">
            <CurrentOrder />
        </Route>
    
        <Route path="/app/delivery/completed-order">
            <CompletedOrders />
        </Route>
        <Route exact path="/app/delivery/wallet">
            <Wallet />
        </Route>
        <Route path="/app/delivery/wallet/withdraw">
            <Withdraw />
        </Route>

        <Route path="/app/order/payment/">
            <OrderPayment />
        </Route>
        <Route path="/app/order/payment-success/">
            <PaymentSuccess />
        </Route>

        
        
        
      </Box>
    </Box>
  );
}

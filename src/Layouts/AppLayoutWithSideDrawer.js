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
import Address from '../components/Cusomter/Address/index';

export default function AppLayoutWithSideDrawer() {

    
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header  position="fixed" />
      <SideDrawer />
      <Box component="main" sx={{flexGrow: 1, p: 3,width: '95%', backgroundColor:"ebedee" }}>
        
        <Route exact path="/delivery/current-order">
            <CurrentOrder />
        </Route>

        
        <Route exact path="/my-account/current-order">
            <CurrentOrder />
        </Route>
        <Route exact path="/my-account/all-orders">
            <MyOrders />
        </Route>
        <Route exact path="/my-account/all-orders/:orderId">
            <SingleOrderDetails />
        </Route>
        
       
        <Route path="/delivery/completed-order">
            <CompletedOrders />
        </Route>
        <Route exact path="/my-account/address">
            <Address />
        </Route>
        <Route exact path="/delivery/wallet">
            <Wallet />
        </Route>
        <Route path="/delivery/wallet/withdraw">
            <Withdraw />
        </Route>
      </Box>
    </Box>
  );
}

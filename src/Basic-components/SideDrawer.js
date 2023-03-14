import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import { useState, useEffect } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
const drawerWidth = 240;
export default function SideDrawer(){


    const history = useHistory();
    const {role} = useSelector(selector);
    let [firstMenus,setFirstMenu]  = useState([]);
    let [secondMenus,setSecondMenu] = useState([]);
    useEffect(()=>{
        if(role == 'customer'){
            setFirstMenu([{name:"My Account",action:()=>{return history.push('/my-account/current-order')}},
                {name:"My Orders",action:()=>{return history.push('/my-account/all-orders')}}
            ]);
            setSecondMenu([
                {name:"Payments",action:()=>{return history.push('/my-account/payments')}},
                {name:"My Addresses",action:()=>{return history.push('/my-account/address')}},
                {name:"Support",action:()=>{return history.push('/my-account/support')}}
            ]); 


        }else if(role == 'wishmaster'){
            //order menus
            setFirstMenu([{name:"Current Order",action:()=>{return history.push('/app/delivery/current-order')}},
                {name:"Completed Order",action:()=>{return history.push('/app/delivery/completed-order')}}
            ]);

            //account related menus
            setSecondMenu([{name:"Payments",action:()=>{return history.push('/app/delivery/wallet')}}
            ]); 


          
        }else{
            alert("This role is not registered yet");
        }
    },[role])
    return (
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            
            [`& .MuiDrawer-paper`]: { width: drawerWidth },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <List>
                {firstMenus.map((element, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={element.name} onClick={element.action}/>
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {secondMenus.map((element, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={element.name} onClick={element.action} />
                </ListItem>
                ))}
            </List>
            </Box>
        </Drawer>
    )
}

const selector = state=>state.user;
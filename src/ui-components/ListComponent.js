import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {InboxIcon} from '@mui/icons-material/Inbox';
import FaceIcon from '@mui/icons-material/Face';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {sideDrawerMenus} from '../Services/userServices';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import Icon from '@mui/material/Icon';
export default function BasicList({handlers}) {

  let userInfo = useSelector(selectUser);
  const listOption = sideDrawerMenus();
  let [listItems,listItemSetter] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    listItems = listOption[userInfo.role];
    listItemSetter(listItems)
  },[])


  return (

    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#F7F7F7' }}>
      <nav aria-label="main mailbox folders">
        <List>
          { listItems.map((element,i) => {
            return  <ListItem key= {i} disablePadding>
                      <ListItemButton onClick={element.action.bind(this,history,dispatch)}>
                        <ListItemIcon>
                          {getIcon(element.icon)}
                      
                        </ListItemIcon>
                        <ListItemText   >{element.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
            })
          }  
        </List>
        
        
    
      </nav>
    </Box>
  );
}

const changeMyRoute = (history)=>{
  history.push('/my-orders');
}

const getIcon = (name)=>{
  let icons = {
    InboxIcon:<ManageAccountsIcon />,
    ManageAccountsIcon:<ManageAccountsIcon/>,
    FaceIcon:<FaceIcon />,
    AccountBalanceWalletIcon:<AccountBalanceWalletIcon />
  }
  return icons[name];
}

const selectUser = state => state.user;

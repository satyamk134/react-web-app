import * as React from 'react';
import {useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector,useDispatch } from 'react-redux';
import HeaderLastMenu from './HeaderLastMenu';
import HeaderRoleMenu from '../components/HeaderRoleMenu';
export default function Header() {

  let isLoggedIn = useSelector(selectLoginStatus);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Menu isLoggedIn={isLoggedIn}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const  GuestMenu = ()=>{
    return <Button color="inherit">Login</Button>
}

const Menu = ({isLoggedIn})=>{
  if(isLoggedIn){
    return <div>
              <HeaderRoleMenu />
            
           </div>; 
          
  }else{
    return <GuestMenu />
  }
    
}

const selectLoginStatus = state => {console.log(state);return state.user.isLoggedIn};




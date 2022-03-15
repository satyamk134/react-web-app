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
import { useHistory } from 'react-router-dom';
export default function Header() {

  let history = useHistory();
  let isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch();
  const loginHandler = ()=>{
    dispatch({type:'LOGIN_POPUP',payload:{isLoginPopupOpen:true}});
  }

  const redirectToLanding = ()=>{
    history.push('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Typography onClick={redirectToLanding} variant="h6" component="div" sx={{ flexGrow: 1,cursor: 'pointer' }}>
            swab
          </Typography>
          <Menu isLoggedIn={isLoggedIn} login={loginHandler}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const  GuestMenu = ({login})=>{
    return <Button color="inherit" onClick={login}>Login</Button>
}

const Menu = ({isLoggedIn,login})=>{
  if(isLoggedIn){
    return <div>
              <HeaderRoleMenu />
            
           </div>; 
          
  }else{
    return <GuestMenu login={login} />
  }
    
}

const selectLoginStatus = state =>  state.user.isLoggedIn;




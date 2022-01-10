import * as React from 'react';
import { useHistory,useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie'
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch  = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHanlder = () => {
    let cookies = new Cookies();
    cookies.remove('token');
    dispatch({type:"SET_LOGIN_STATUS",payload:{isLoggedIn:false,token:"",loginStatus:""}})
    setAnchorEl(null);
    history.push("/");
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        color="inherit"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutHanlder}>Logout</MenuItem>
      </Menu>
    </div>
  );
}



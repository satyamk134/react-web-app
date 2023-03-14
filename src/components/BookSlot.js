import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TimeSlots from './TimeSlots';
import Button from '@mui/material/Button';
import TimeSelector from './TimePicker';
import SuccessAlertComponent from './SuccessAlert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import OrderSummary from '../components/OrderSummary';
import {getCart, pushOfflineCart} from '../Services/HttpApiCall';
import {useHistory} from 'react-router-dom';
import './css/book-slot.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BookSlot() {
  const [value, setValue] = React.useState(0);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [slotSelected, slotSelector] = React.useState(0);
  const [cartInfo,setCartInfo] = useState({merchantName:"",id:""})
  let [cart, setCart] = React.useState([]);
  const  userInfo = useSelector(selectUser);
  const orderInfo = useSelector(selectOrder)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{ 
    if(userInfo.isPickupSlotBooked){
      setSuccessAlert(true);
    }
      
  },[userInfo.isPickupSlotBooked]);

  useEffect(()=>{

    getCartDetails();
    
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCartDetails = async  () => {
    //check for offline cart and push them
    let offlineCart = localStorage.getItem("OfflineCart");
    if(offlineCart){
      let offlineCartServices = offlineCart.split(",");
      try{
        await pushOfflineCart({services:offlineCartServices});
        localStorage.removeItem("OfflineCart");
        let cartDetails = await getCart();
        setCart(cartDetails.data);
        setCartInfo(cartDetails.cartInfo)
        return cartDetails;
      }catch(err){
        //Don't delete the localstorage;
        console.error(err);
      }
    }else{
      let cartDetails = await getCart();
      setCart(cartDetails.data);
      setCartInfo(cartDetails.cartInfo)
      return cartDetails;
    }
    
  }
  const selectAddressHandler = () => {
    dispatch({type:"SET_PICKUP_TIME",payload:{time:slotSelected}})
    history.push('/app/select-address');
  }


  return (

    <div className='book-slot-wrapper'>
      <div class="book-slot-time-picker">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Today" {...a11yProps(0)} />
              <Tab label="Tomorrow" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <TimeSelector selectTimeHandler={slotSelector} />
          </TabPanel>
          <TabPanel value={value} index={1} >
            <TimeSelector  selectTimeHandler={slotSelector} />  
          </TabPanel>
        </Box>
        
        
      </div>
      <div className='book-slot-cart'>
        <OrderSummary cart={cart} merchantName={cartInfo.merchantName} />
        <div className='book-slot-button'>
          <Button variant="contained" color="secondary" onClick ={selectAddressHandler}>CONFIRM PICK UP TIME</Button>
        </div>
        
      </div>
    </div>    
  );
}
const selectUser = (state)=>{return state.user};
const selectOrder = (state)=>{return state.order};

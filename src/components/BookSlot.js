import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimeSlots from './TimeSlots';
import Button from '@mui/material/Button';
import TimeSelector from './TimePicker';
import SuccessAlertComponent from './SuccessAlert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
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
  const [slotSelcted, slotSelector] = React.useState(0);
  const  userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{ 
    if(userInfo.isPickupSlotBooked){
      setSuccessAlert(true);
    }
      
  },[userInfo.isPickupSlotBooked])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const confirmOrder = () =>{
      console.log("selected time slot is",slotSelcted );
      dispatch({type:'BOOK_PICKUP_SLOT', payload:{ expectedPickupTime: slotSelcted}});
      
  }
  return (
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

      <Button variant="contained" onClick ={confirmOrder}>Book Now</Button>
      <SuccessAlertComponent open={successAlert} setOpen={setSuccessAlert} msg="Slot booked successfully" />
    </Box>

    
  );
}
const selectUser = (state)=>{return state.user};

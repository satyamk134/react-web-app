import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function TimeSlots({slotSelector}) {
  slotSelect = slotSelector;
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={slotBookingHandler}>
              <ListItemIcon>
                <AccessTimeIcon />
                <Checkbox {...label} defaultChecked />
              </ListItemIcon>
              <ListItemText primary="12 : 30 PM" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeIcon />
                <Checkbox {...label}  />
              </ListItemIcon>
              <ListItemText primary="01 : 00 PM" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeIcon />
                <Checkbox {...label}  />
              </ListItemIcon>
              <ListItemText primary="01 : 30 PM" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton disabled={true}>
              <ListItemIcon>
                <AccessTimeIcon />
                <Checkbox {...label}  />
              </ListItemIcon>
              <ListItemText primary="02 : 30 PM" />
            </ListItemButton>
          </ListItem>
          
        </List>
      </nav>
      <Divider />
    </Box>


  );
}

let slotSelect = ()=>{};

const slotBookingHandler = () =>{
    //book the slot for specific person(customer)
    slotSelect(2);
    console.log("slot booking clicked");
}

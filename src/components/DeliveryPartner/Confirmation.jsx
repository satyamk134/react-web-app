import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Confirmation(props) {
  
  let {shopName} = props;
  shopName = 'Wishers Laundary'
  return (
    <Box sx={{ width: '100%' }}>
        <p>I am Pickup Drop confirmation for given order</p>
        <p>
          Dropping the order at {shopName}
        </p>
    </Box>
  );
}

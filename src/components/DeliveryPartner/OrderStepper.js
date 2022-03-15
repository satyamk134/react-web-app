import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {shipment} from '../../Services/HttpApiCall';

const steps = [
  {
    label: 'Add Cloth Details',
    description: `Please enter the quantity of cloth`,
  },
  {
    label: 'Pickup from Customer Place',
    description:
      'Start navigation to the Laundary shop',
  },
  {
    label: 'Drop at Laundary Shop',
    description: `Complete this step and get ready for new order`,
  },
];

export default function OrderStepper({orderId}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    stepFunctionality[activeStep](orderId);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

const stepFunctionality = {
    0:function(orderId){
        console.log("clothes colleted");
        shipment.update({orderId:orderId,status:"collectionDone"})
        .then(res=>{
            console.log("res is",res);
        })
        
    },
    1:function(orderId){
        console.log("going to laundry shop");
        shipment.update({orderId:orderId,status:"deliveryToShopStarted"})
        .then(res=>{
            console.log("res is",res);
        })
    },
    2:function(orderId){
        console.log("delivery package to laundary shop");
        shipment.update({orderId:orderId,status:"deliveryToShopDone"})
        .then(res=>{
            console.log("res is",res);
        })
    }
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import './styles/journey.scss';


export default function Journey(props) {
    const {status,source,destination} = props.details;

    const { control, handleSubmit } = useForm({
        defaultValues: {
          source: '142 1st C Main HSR Layout Sector -1, Agara Village, Bangalore-560102',
          destination:' 414, 7th Main Rd, HRBR Layout 1st Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043s',
          select: {}
        }
    });

    const onSubmit = data => console.log(data);
    const {activeStep,steps} = props;
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='jouney_wrapper'>
                    <Controller
                        name="source"
                        control={control}
                        render={({ field }) =>  <TextField id="filled-basic" label="Your address" variant="filled" value = {field.value}/>}
                    />

                    <Controller
                        name="destination"
                        control={control}
                        render={({ field }) =>  <TextField id="filled-basic" label="Destination" variant="filled" value = {field.value}/>}
                    />
                </div>
                
            </form>

            <p>I am trip with MAP location</p>
        </div>
  );
}

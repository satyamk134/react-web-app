import * as React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

export default function TimeSelector({selectTimeHandler}) {
  const [value, setValue] = React.useState(Date.now())

  const handleChange = (newValue) => {
    console.log("select time is",newValue);
    var today = new Date(newValue);
    let seconds = today.getTime();
    selectTimeHandler(seconds);
    
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Please select Pickup time
      </Grid>
      <Grid item xs={3}>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <TimePicker
            label="Time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

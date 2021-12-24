import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackAlert() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const alert = useSelector(selectAlert);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({type:'HIDE_SNACKBAR',payload:{showSnackbar:false}});
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert.showSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.snackbarStatus} sx={{ width: '100%' }}>
          {alert.snackbarMsg}          
        </Alert>
      </Snackbar>
    </Stack>
  );
}

const selectAlert = state => state.alert;

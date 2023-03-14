import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const spinners = useSelector(state=>state.spinner);

  useEffect(()=>{
    setOpen(spinners.backdrop)
  },[spinners.backdrop])

  const handleClose = ()=>{
    setOpen(false)
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

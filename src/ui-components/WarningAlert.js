import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';

export default function WarningAlert({successCallback,failureCallBack,open,msg}) {
  return (
    <Dialog
    open={open}
    onClose={failureCallBack}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
        Alert
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {msg}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={failureCallBack}>CANCEL</Button>
        <Button onClick={successCallback} autoFocus>
        OKAY
        </Button>
    </DialogActions>
    </Dialog>
  );
}

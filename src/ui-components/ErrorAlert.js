import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';

export default function ErrorAlert({successCallback,failureCallBack}) {
  const dispatch = useDispatch();
  const popups = useSelector(state=>state.alert);
  const handleClickOpen = () => {
    dispatch({type:'TOGGLE_DIALOG_ALERT',payload:{showAlert:true}})
  };

  const handleClose = () => {
    dispatch({type:'TOGGLE_DIALOG_ALERT',payload:{showAlert:false}})
  };

  return (
    <div>
      <Dialog
        open={popups.errorDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popups.dialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={failureCallBack}>CANCEL</Button>
          <Button onClick={successCallback} autoFocus>
            OKAY
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

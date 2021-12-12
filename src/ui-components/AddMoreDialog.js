import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  width: "100%", maxWidth: "none"
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;


  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function AddMoreClothes() {
  const [open, setOpen] = React.useState(false);
  const [service, setService] = React.useState('dryWash');
  const dispatch = useDispatch();
  let orderState = useSelector(selectOrder);
  const formik = useFormik({
    initialValues: {
      service:"dryWash",
      quantity:1
    },
    onSubmit: (values) => {
     console.log("values are for add service",values);
     /**
      * dispatch action to to redux saga
      */
    
      saveToOrderDetails({...values,...orderState});

      
     
    },
  });

  const handleClose = () => {
    dispatch({ type: "SET_ADD_CLOTH_STATUS", payload: { isUpdateOrderOpen: false } })
  };

  const saveToOrderDetails = (details)=>{
      let dbRow = {};
      dbRow['count'] = details.quantity;
      dbRow['clothType'] = details.service;
      dbRow['orderId'] = details.selectedOrderId;
      dbRow['agentId'] = 9;
      dispatch({type:'SAVE_ORDER_DETAILS',payload:dbRow});
  }

  React.useEffect(() => {

  }, [orderState.isUpdateOrderOpen])

  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={orderState.isUpdateOrderOpen}
        fullWidth
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Order Details
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Typography gutterBottom>
              Please select service type and quantity
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="service">Service</InputLabel>
                    <Select
                      labelId="service"
                      id="service"
                      value={formik.values.service}
                      label="service"
                      name="service"
                      onChange={formik.handleChange}

                    >
                      <MenuItem value="dryWash">Dry Wash</MenuItem>
                      <MenuItem value="steamPress">Steam Press</MenuItem>
                      <MenuItem value="normalWash">Normal Wash</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="quantity">Qunatity</InputLabel>
                    <Select
                      labelId="quantity"
                      id="quantity"
                      value={formik.values.quantity}
                      label="qunatity"
                      name="quantity"
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>

            <Button variant="outlined" color="error" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outlined" color="success" type="submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
         
      </BootstrapDialog>
    </React.Fragment>
  );
}

const selectOrder = state => state.order;

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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect,useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minWidth: "500px"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
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

export default function OrderDetails(props) {
  const {openOrderDetail, setOrderDetail,servicesWithDetail} = props;
  const [localClothes,setlocalClothes] = useState([]);
  const handleClose = () => {
    setOrderDetail(false);
  };
  const showSelectedServiceClothes = (selectedIndex)=>{
    setlocalClothes(servicesWithDetail[selectedIndex].particulars);
  }
  
  

  

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openOrderDetail}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Services Booked
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <Box>
            <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Service Type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    {servicesWithDetail.map(((element,index)=><FormControlLabel 
                            value={element.id} control={<Radio />} 
                            label={element.name}
                            onClick={showSelectedServiceClothes.bind(this,index)}
                        />))
                    }
                    
                    
                </RadioGroup>
            </FormControl>
            </Box>
            <Box>
                  {localClothes.map((element)=>(<p>{element.serviceDetail.cloth}   {element.count}</p>))}
            </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { orderDetails } from '../../Services/HttpApiCall';



export default function AddedItemList({ unit,orderId,serviceId,particulars }) {
  console.log("particulars",particulars);

  const dispatch = useDispatch();
  const orderState = useSelector(selectOrder);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const deleteAddedCloth = (index,orderDetailId)=>{
    dispatch({ type: 'DELETE_ORDER_DETAIL', payload: {index:index,orderDetailId:orderDetailId}})
  }
  
  return (
    <Box sx={{maxWidth: 752, height: '400px',overflow:'auto' }}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Added Clothes
          </Typography>
          
            <List dense={dense}>
              {particulars.map((element,index) => {
                  
                    return <ListItem
                    
                    secondaryAction={
                      <IconButton onClick={deleteAddedCloth.bind(this, index,element.id)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <CheckroomIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={element.serviceDetail.cloth}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemText
                      primary={element.count +" "+ unit}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  
                  
                
              })
              }
            </List>
         
        </Grid>
      </Grid>
    </Box>
  );
}

const selectOrder = state => state.order;

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function Transactions(props) {

  let {action,amount,description,source} = props.row;

  const TrasactionIcon = ()=>{
      if(action == 'add'){
        return <AddCircleOutlineIcon  sx={{color: 'green'}}/>
      }else{
        return <RemoveCircleOutlineIcon  sx={{color: 'red'}}/>
      }
      
  }

  const TransactionType = ()=>{
    if(action == 'add'){
        return <Box>
                    <Typography
                        color="green"
                        variant="h5"
                    >
                    <CurrencyRupeeIcon /> {amount}
                    </Typography> 
                </Box>
      }else{
        return <Box>
                    <Typography
                        color="red"
                        variant="h5"
                    >
                    <CurrencyRupeeIcon /> {amount}
                    </Typography> 
                </Box>
      }
  }
  
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

       
     
      <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                <TrasactionIcon />
            </ListItemAvatar>
            <ListItemText
            primary={description}
            
            secondary={
                <React.Fragment sx={{}}>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Box>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            pr="15px"
                            
                        >By- {source} 
                            
                        </Typography>
                        12/25/2022    9:40 PM
                    </Box>
                    <Box>
                        <TransactionType />
                    </Box>
                </Box>
                
                


                </React.Fragment>
            }
            />


        </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

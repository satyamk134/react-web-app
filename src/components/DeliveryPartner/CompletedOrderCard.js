import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CompletedOrderCard(props) {

  const {merchantName, id} = props.deliveredItem.Order
  return (
    <Card sx={{ minWidth: 275 , width:'40%',mt:'10px'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Order Id  - {id}
        </Typography>
        <Typography variant="h5" component="div">
          {merchantName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Delivered
        </Typography>
        <Typography variant="body2">
            Amount Credited - Rs 30
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Need Help?</Button>
      </CardActions>
    </Card>
  );
}

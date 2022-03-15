import React from "react";
import MerchantServices from './MerchantServices';
import Grid from '@mui/material/Grid';
import MerchantCheckout from './MerchantCheckout'
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
export default function MerchantLanding(){
    const {shopId} = useParams();
    return (
        <Box sx={{padding:'20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <MerchantServices shopId={shopId}/>
                </Grid>
                <Grid item xs={4}>
                    <MerchantCheckout  />
                </Grid>
            </Grid>
        </Box>
    )
}
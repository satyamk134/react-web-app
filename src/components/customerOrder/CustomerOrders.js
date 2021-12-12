import * as React from 'react';
import ListComponent from '../../ui-components/ListComponent'
import Container from '@mui/material/Container';
import CollapsibleTable from '../../ui-components/CollapsableTable';
import { Grid } from '@mui/material';
export default function CusomterOrders(){

    const itemsHandlers = {
        pickup:function(){
            //fetch orders to be picked up
            
        },
        delivery:function(){
            //all delivery orders will appear here
            console.log("all orders for delivery");
        },
        ongoing:function(){
            console.log("all orders for ongoing");
        }
    }
    return (
        <Container maxWidth="sl" sx={{mt:"10px"}}>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                <ListComponent handlers={itemsHandlers}/>
                </Grid>
                <Grid item xs={8}>
                    <CollapsibleTable />
                </Grid>

            </Grid>
            
            
        </Container>
    )

} 
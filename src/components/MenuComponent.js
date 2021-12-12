import * as React from 'react';
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StyledEngineProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";
import { getGoogleAuthUrl, loginGoogleUser, getToken } from '../Services/HttpApiCall';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import { setBearerToken } from '../Services/config';
const qs = require('qs');

const ClothType = (props)=>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let history = useHistory();
    

    function checkForLogin(){
        //if use is logged in, go to specific category menu
        
        if(user.isLoggedIn){
            console.log("Now category page will open");
            history.push("/slot-booking");
        }else{
            console.log("Now login pop up will appear");
            dispatch({ type: 'LOGIN_POPUP' ,payload:{isLoginPopupOpen:true}});
            
        }
        //else login pop open

        
    }

    function selectTimeHandler(){
        
    }
    return ( 
        <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    {props.category}
                </Typography>
                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    20/Kg
                </Typography>
                
                </CardContent>
                <CardActions>
                <Button size="small" onClick={checkForLogin}>Book Now</Button>
                </CardActions>
            </Card>
        </Grid>
        
    );
}
const selectUser = state => state.user;



export default function Menu() {
    
  return (
    <div>
        <Box sx={{ flexGrow: 1,padding:'10px' }}>
            <Grid container spacing={4}>
                <ClothType category="Regular Wash" />
                <ClothType category="Steam Press"/>
                <ClothType category="Regular Press"/>
                <ClothType category="Dry Cleaning"/>
            </Grid>
        </Box>
    </div>
  );
}

import * as React from 'react';
import  { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
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
import {getMerchantList} from '../Services/HttpApiCall'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import { setBearerToken } from '../Services/config';
import Shop from './Merchant/Shop'
import { element } from 'prop-types';
const qs = require('qs');
const selectUser = state => state.user;



export default function Menu() {
    let [shopList,setShopList] = useState([]);

    useEffect(()=>{
        getMerchantList()
        .then(result=>{
          setShopList(result);
        })
    },[])
    
  return (
    <Box sx={{ display:'flex',padding:"20px",flexDirection:"row",justifyContent:'center' }}>

        <Grid container spacing={2}>
        {
            shopList.map(element=>{
                return <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Shop shopInfo={element} />
                        </Grid>
            })
        }
        </Grid>    
    </Box>
  );
}

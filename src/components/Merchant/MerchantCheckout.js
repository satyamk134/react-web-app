import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {} from '../../Services/HttpApiCall';
import Cookies from 'universal-cookie';
import './merchant.css';
import { Toolbar } from "@material-ui/core";
import Box from '@mui/material/Box';
export default function MerchantCheckout(){

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const shop = useSelector(selectShop);
    const history = useHistory();

    const goToBookSlotHandler = ()=>{
       
        
       
        //if use is logged in, go to specific category menu

        //do api call to validate jwt token
       
            let cookies = new Cookies();
            let token = cookies.get('token');
            if(token){
                //update user cart
            
                history.push("/app/slot-booking");
            }else{
                dispatch({type:'UPDATE_USER_STATE', payload:{isLoggedIn:false, isLoginPopupOpen:true}})
            }
            
         
    }
    
    
    return (
        <Box sx={{ width: '100%' }}>
            
            <div className="checkout-wrapper">
                <Button onClick={goToBookSlotHandler} variant="contained" disableElevation style={{
                        borderRadius: 35,
                        backgroundColor: "#21b6ae",
                        padding: "18px 36px",
                        fontSize: "18px"
                        
                    }}>
                    PROCEED TO CHECKOUT
                </Button>
            </div>
        </Box>
        
    )
}

const selectUser = state => state.user;
const selectShop = state => state.shop;
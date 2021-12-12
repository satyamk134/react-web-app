import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoginForm from '../components/loginForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import { setBearerToken } from '../Services/config';
import Cookies from 'universal-cookie';
import { getGoogleAuthUrl, loginGoogleUser, getToken, login } from '../Services/HttpApiCall';

export default function Login() {
  let open = useSelector(selectPopupStatus);
  let userInfo = useSelector(selectUser);
  let [emailId,setEmailId] = useState('');
  let [password,setPassword]=useState('');
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const qs = require('qs');
  useEffect(()=>{


      let search = qs.parse(location.search,{ ignoreQueryPrefix: true });

      /**
       * If code params in present in url, then it came after successfull redirection
       */
      if(search.code && !userInfo.isLoggedIn){ /**code param is present and user is not loggedIn */
        googleSuccessHandler();
        
      }
      if(userInfo.isLoggedIn){
        saveUserInsideCookie();
        setBearerToken(userInfo.token);
        redirectAfterLogin(userInfo);
      }
      
      let isUserLoggedIn = checkLoginCookie();
      if(isUserLoggedIn){
        /*
        user is already logged in, fetch the details using token
        */
        if(!userInfo.isLoggedIn){

          dispatch({type:"DECODE_JWT",payload:{token:isUserLoggedIn}});
        }
      
      }else{
          // do nothing
      }
  },[userInfo.isLoggedIn]);

  useEffect(()=>{
    if(userInfo.isLoginPopupOpen){
      let isUserLoggedIn = checkLoginCookie();
      if(isUserLoggedIn){
        //user is already logged in
        //dispatch action set login popup close 
        dispatch({type:"LOGIN_POPUP", payload:{isLoginPopupOpen:false}});
        redirectAfterLogin(userInfo);
      }else{
          // do nothing
          console.log("open the login popup");
      }
    }
  },[userInfo.isLoginPopupOpen]);

  useEffect(()=>{
    if(emailId && password){
      handleLogin();
    }
  },[emailId,password])

  const checkLoginCookie = () => {
    let cookies = new Cookies();
    let token = cookies.get('token');
    if(token) {
      return token;
    } else {
      return false;
    }

  }
  const handleClickOpen = () => {
    
    dispatch({type: 'LOGIN_CLICK'});
    return dispatch({type: 'LOGIN_POPUP' ,payload:{isLoginPopupOpen:true}});
  };

  const handleClose = () => {
    //console.log("handle close");
    
    return dispatch({type: 'LOGIN_POPUP' ,payload:{isLoginPopupOpen:false}});
  };

  const handleLogin = () => {
    //redirect to specific category page and update state
    console.log("handle login function called");
      dispatch({type: 'LOGIN_CLICK'});
      dispatch({type: 'LOGIN' ,payload:{isLoggedIn:false,emailId:emailId, password:password}});
  }

  const googleLoginHandler = ()=>{
      //go for google oauth login

      /**
       * after login in google account they will redirected with code in url on this page
       */

      
      /**
       * if code is found, google login was successfull
       */
    
      //go for google oauth login      
      getGoogleAuthUrl()
      .then((response)=>{
          console.log(response);
          window.location = response.data.url;
      });
      
  }

  const setJwtToken = (res)=>{
    setBearerToken(res.data.id_token);
    return Promise.resolve("token set");
  }
  
  const googleSuccessHandler = ()=>{
    let search = qs.parse(location.search,{ ignoreQueryPrefix: true });
      setBearerToken(search.code);
      getToken({code:search.code})
      .then(setJwtToken)
      .then(loginGoogleUser)
      .then((res)=>{
         dispatch({type:'LOGIN',payload:{emailId:res.data.data.emailId}});
         return Promise.resolve(1);
      })
      .catch(err=>{
          console.log("Error in login",err);
      })
  }

  const saveUserInsideCookie = ()=>{
    let cookies = new Cookies();
    cookies.set('token', userInfo.token, { path: '/' });
    Promise.resolve("token cookie saved");
  }

  const redirectAfterLogin = (userInfo)=>{

    if(userInfo.role == "wishmaster"){
      history.push("/my-orders-agent");
    }else if(userInfo.role == "admin"){
      history.push("/dashboard");
    }else{
      history.push("/slot-booking");
    }
    

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We need few details to continue,
          </DialogContentText>
          <LoginForm setEmailId={setEmailId} setPassword={setPassword} handleLogin={handleLogin} />
          <Button onClick={googleLoginHandler}>Continue with Google</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>SIGNUP</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const selectPopupStatus = state => {console.log(state);return state.user.isLoginPopupOpen};
const selectUser = state => state.user;



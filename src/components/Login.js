import * as React from 'react';
import RegisterForm from './Register'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LoginForm from '../components/loginForm';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { setBearerToken } from '../Services/config';
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { getGoogleAuthUrl, loginGoogleUser, getToken, login } from '../Services/HttpApiCall';
import './css/Login.css';

export default function Login() {
  let open = useSelector(selectPopupStatus);
  let userInfo = useSelector(selectUser);
  let [emailId, setEmailId] = useState('');
  let [password, setPassword] = useState('');
  let [isLogin, setLoginForm] = useState(true);
  let [signupForm, setSignupForm] = useState({ firstName: '', lastName: '', emailId: '', password: '' });
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const qs = require('qs');
  useEffect(() => {


    let search = qs.parse(location.search, { ignoreQueryPrefix: true });

    /**
     * If code params in present in url, then it came after successfull redirection
     */
    if (search.code && !userInfo.isLoggedIn) { /**code param is present and user is not loggedIn */
      googleSuccessHandler();

    }
    console.log("before ------------>userInfo",userInfo);
    if (userInfo.isLoggedIn) {
      console.log("userInfo",userInfo);
      saveUserInsideCookie();
      setBearerToken(userInfo.token);
      redirectAfterLogin(userInfo);
    }

    let isUserLoggedIn = checkLoginCookie();
    if (isUserLoggedIn) {
      /*
      user is already logged in, fetch the details using token
      */
      if (!userInfo.isLoggedIn) {

        dispatch({ type: "DECODE_JWT", payload: { token: isUserLoggedIn } });
      }

    } else {
      // do nothing
    }
  }, [userInfo.isLoggedIn]);

  useEffect(() => {
    if (userInfo.isLoginPopupOpen) {
      //user is already logged in
      //dispatch action set login popup close 
      dispatch({ type: "LOGIN_POPUP", payload: { isLoginPopupOpen: true } });
    }
  }, [userInfo.isLoginPopupOpen]);

  useEffect(() => {
    if (userInfo.loginStatus == 'submitted') {
      handleLogin();
    }
  }, [userInfo.loginStatus])

  useEffect(() => {
    if(userInfo.signupStatus == 'submitted') {
      handleSignup();
    }

    if (userInfo.signupStatus == 'signedUp') {
      setEmailId(signupForm.emailId);
      setPassword(signupForm.password);
      dispatch({ type: 'SET_LOGIN_STATUS', payload: { loginStatus: "submitted", isLoggedIn: false } });
    }
  }, [userInfo.signupStatus])



  const checkLoginCookie = () => {
    let cookies = new Cookies();
    let token = cookies.get('token');
    console.log("token is", token);
    setBearerToken(token);
    if (token) {
      return token;
    } else {
      return false;
    }

  }

  const handleClose = () => {
    //console.log("handle close");

    return dispatch({ type: 'LOGIN_POPUP', payload: { isLoginPopupOpen: false } });
  };

  const handleLogin = () => {
    //redirect to specific category page and update state
    dispatch({ type: 'LOGIN_CLICK' });
    dispatch({ type: 'LOGIN', payload: { isLoggedIn: false, emailId: emailId, password: password } });
  }

  const googleLoginHandler = () => {
    //go for google oauth login

    /**
     * after login in google account they will redirected with code in url on this page
     */


    /**
     * if code is found, google login was successfull
     */

    //go for google oauth login      
    getGoogleAuthUrl()
      .then((response) => {
        sessionStorage.setItem("redirectToUrl",location.pathname)
        window.location = response.url;
      });

  }



  const setJwtToken = (res) => {
    setBearerToken(res.data.id_token);
    return Promise.resolve("token set");
  }

  const googleSuccessHandler = () => {
    let search = qs.parse(location.search, { ignoreQueryPrefix: true });
    setBearerToken(search.code);
    getToken({ code: search.code })
      .then(setJwtToken)
      .then(loginGoogleUser)
      .then((res) => {
        dispatch({
          type: 'UPDATE_USER_STATE', payload: {
            ...res.data, ...{
              isLoggedIn: true,
              loginStatus: "loggedIn",
              loginButtonClicked: true,
              provider:res.data.provider
            }
          }
        });
        return Promise.resolve(1);
      })
      .catch(err => {
        console.log("Error in login", err);
      })
  }

  const saveUserInsideCookie = () => {
    let cookies = new Cookies();
    cookies.set('token', userInfo.token, { path: '/' });
    Promise.resolve("token cookie saved");
  }

  const redirectAfterLogin = (userInfo) => {
    if(userInfo.provider == 'google'){
      let url = sessionStorage.getItem("redirectToUrl");
      sessionStorage.removeItem('redirectToUrl');
      if(userInfo.role == "wishmaster" && userInfo.loginButtonClicked){
        history.push("/app/delivery/current-order");
      }else if(userInfo.role == "admin" && userInfo.loginButtonClicked){
        history.push("/dashboard");
      }else if(userInfo.loginButtonClicked){
        history.push(url);
      }
    }else{
      if(userInfo.role == "wishmaster" && userInfo.loginButtonClicked){
        history.push("/app/delivery/current-order");
      }

    }
    
  }

  const newUserHandler = () => {
    //hide the login form and open the sign up form
    setLoginForm(!isLogin);
  }

  const handleSignup = () => {
    //redirect to specific category page and update state
    dispatch({ type: 'SIGNUP_CLICK' });
    dispatch({ type: 'SIGNUP', payload: signupForm });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We need few details to continue,
          </DialogContentText>
          {isLogin ? <LoginForm setEmailId={setEmailId} setPassword={setPassword} handleLogin={handleLogin} /> :
            <RegisterForm setSignupForm={setSignupForm} />
          }
          <Box className='login-register'>
            <LoginSignUp isLogin={isLogin} newUserHandler={newUserHandler} />
          </Box>

        </DialogContent>
        <DialogActions>
          <Box className='login-with-google'>
            <Button variant="contained" onClick={googleLoginHandler}>Continue with Google</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const LoginSignUp = ({ isLogin, newUserHandler }) => {
  if (isLogin) {
    return <Link href="#" onClick={newUserHandler} underline="hover">New User? Click here</Link>
  } else {
    return <Link href="#" onClick={newUserHandler} underline="hover">Existing User? Click here</Link>
  }
}

const selectPopupStatus = state => { console.log(state); return state.user.isLoginPopupOpen };
const selectUser = state => state.user;



import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import   './css/LoginForm.css';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
export default function LoginForm(loginMethods){
const validationSchema = yup.object({
    emailId: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  let userInfo = useSelector(selectUser);
  let dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      emailId: '',
      password:''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      
      loginMethods.setEmailId(values.emailId);
      loginMethods.setPassword(values.password);
      dispatch({type:'SET_LOGIN_STATUS',payload:{loginStatus:"submitted",isLoggedIn:false}});
      //loginMethods.handleLogin();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
    
        
      <TextField  label="Email id" variant="standard"  id="emailId"
        name="emailId"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.emailId}
        error={formik.touched.emailId && Boolean(formik.errors.emailId)}
        helperText={formik.touched.emailId && formik.errors.emailId}
      />

        <TextField  label="password" variant="standard"  id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
        />
        <Box className='login-button'>
          <LoadingButton   type="submit" loading={userInfo.loginStatus == 'submitted'}  variant="outlined">
                LOGIN
          </LoadingButton>  
        </Box>
         
      
            
    </form>
  );
};

const selectUser = state => state.user;


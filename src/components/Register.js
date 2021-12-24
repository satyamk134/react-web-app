import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import   './css/RegisterForm.css';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
export default function RegisterForm(registerMethods){
const validationSchema = yup.object({
    firstName: yup
      .string('Enter your First Name')
      .required('First Name is required'),
    lastName: yup
      .string('Enter your lastname')
      .required('Lastname is required'),
    emailId: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
  });

  let userInfo = useSelector(selectUser);
  let dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      emailId: '',
      password:'',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
        console.log("register success");
        registerMethods.setSignupForm(values);
        dispatch({type:'SET_SIGNUP_STATUS',payload:{signupStatus:"submitted",isSignedUp:false}});
         
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="signup-form">

      <TextField  label="First Name" variant="standard"  id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
      />

      <TextField label="Last Name" variant="standard"  id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
      />
      
    
        
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
        <Box className='signup-button'>
          <LoadingButton   type="submit"   variant="outlined">
                SIGN UP
          </LoadingButton>  
        </Box>
         
      
            
    </form>
  );
};

const selectUser = state => state.user;


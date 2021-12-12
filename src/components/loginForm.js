import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import   './css/loginForm.css'
export default function LoginForm(loginMethods){
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.

  const formik = useFormik({
    initialValues: {
      emailId: '',
      password:''
    },
    onSubmit: values => {
      console.log("for, values are",values);
      console.log(loginMethods);
      loginMethods.setEmailId(values.emailId);
      loginMethods.setPassword(values.password);
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
      />

        <TextField  label="password" variant="standard"  id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
        />
    
        <Button type="submit">LOGIN</Button>
    </form>
  );
};


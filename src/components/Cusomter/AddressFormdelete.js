import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import { useSelector,useDispatch } from 'react-redux';
import '../css/addressForm.css';
import { useState,useEffect } from 'react';
import {getAddress} from '../../Services/HttpApiCall'

const validationSchema = yup.object({
    firstName: yup
    .string('Enter your email')
    .required('First Name is required'),

    lastName: yup
    .string('Enter your email')
    .required('Last Name is required'),

    address: yup
    .string('Enter your email')
    .required('Email is required'),
    
    city: yup
    .string('Enter your email')
    .required('City is required'),

    pincode: yup
    .string('Enter your email')
    .required('Pincode is required'),

    country: yup
    .string('Enter your email')
    .required('Country is required'),

    phoneNumber: yup
    .string('Enter your email')
    .required('Phone Number is required'),

});

const AddressForm = () => {
  const dispatch = useDispatch();
  const [addresses,setAddresses] = useState([]);

  const fetchAddress = async ()=>{
        let response = await getAddress();
        setAddresses(response.data.payload);
  }

  //fetch saved address
  useEffect(fetchAddress,[]);

  const formik = useFormik({
    initialValues: {
        firstName: "",
        lastName: "",
        address:"",
        city:"",
        pincode:"",
        country:"",
        phoneNumber:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        dispatch({type:'ADD_NEW_ADDRESS',payload:values})
    },
  });

  return (
    <div>

    <Grid container>
        <Grid  style={{}}>
            <form onSubmit={formik.handleSubmit} className='form-wrapper'>
                <div className='first-last-name'>
                    <div className='form-input-wrapper'>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </div>
                    
                    <div className='form-input-wrapper'>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                
                </div>
                
                <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Street Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />

                <div className='city-pincode'>
                    <div className='form-input-wrapper'>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </div>
                    <div className='form-input-wrapper'>
                        <TextField
                            fullWidth
                            id="pincode"
                            name="pincode"
                            label="Pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </div>
                    
                    
                </div>
                <TextField
                    fullWidth
                    id="country"
                    name="country"
                    label="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                />

                <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
            
                <Button color="primary" variant="contained" fullWidth type="submit" style={{padding:'10px'}}>
                    Submit
                </Button>
            </form>
        </Grid>
        <Grid>
            <p>Added Address</p>
            <div className='addresses'>
                {
                    addresses.map(element=>{
                        return <div>
                                    <p>
                                        Satyam Kumar<br></br>
                                        142, 1st C Main, HSR Laout Sector -1<br></br>
                                        Bangalore - 560102<br></br>
                                        India<br></br>
                                        Mobile No- 9964033713
                                    </p>
                                    <Button variant="text">Edit</Button>
                                    <Button variant="text" color="error">DELETE</Button>
                                </div>
                    })
                }
            </div>
        </Grid>
    </Grid>
     
    </div>
  );
};
export default AddressForm;


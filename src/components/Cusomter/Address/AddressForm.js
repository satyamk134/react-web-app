import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import '../../css/addressForm.css';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useState } from "react";


export default function AddressForm({successHandler,cancelHandler,address}) {

    const selectAddress = state=>state.address;
    const addressState = useSelector(selectAddress);
    let initialValues = {
        firstName:"",
        lastName:"",
        lastName:"",
        pincode:"",
        country:"",
        address:"",
        mobileNumber:""
    };
    initialValues = {...address};
    
    const { register, handleSubmit,setValue,replace, watch, formState: { errors } } = useForm({defaultValues:initialValues});
    const onSubmit = data => {
        successHandler(data)
    }

    const cancelFormHandler = ()=>{
        cancelHandler();
    }
    useEffect(()=>{

    },[])
    
    //setFirstName(initialValues.firstName);
    // for(let key in initialValues){
    //     console.log("set value called again---------->",key);
    //     setValue(key,firstName,{ shouldValidate: false });
    // }
    
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
            <div className='first-last-name'>
                <div className='form-input-wrapper'>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        {...register("firstName", { required: true, maxLength: 20 })}
                        error={errors?.firstName}
                        
                        helperText={errors?.firstName?"First name is required":""}

                    />
                </div>

                <div className='form-input-wrapper'>
                    <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            {...register("lastName", { required: true, maxLength: 20 })}
                            error={errors?.lastName}
                            helperText={errors?.lastName?"Last name is required":""}
                    />
                </div>

            </div>
            <div className="form-input-wrapper">
                <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Street Address"
                    {...register("address", { required: true, maxLength: 20 })}
                    error={errors?.address}
                    helperText={errors?.address?"Address is required":""}
                />
            </div>

           

            <div className='city-pincode'>
                <div className='form-input-wrapper'>
                    <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        {...register("city", { required: true, maxLength: 20 })}
                        error={errors?.city}
                        helperText={errors?.city?"City name is required":""}
                    />
                </div>
                <div className='form-input-wrapper'>
                    <TextField
                        fullWidth
                        id="pincode"
                        name="pincode"
                        label="Pincode"
                        {...register("pincode", { required: true, maxLength: 20 })}
                        error={errors?.pincode}
                        helperText={errors?.pincode?"Pincode is required":""}
                    />
                </div>
            </div>

            <div className="form-input-wrapper">
                <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Mobile Number"
                    {...register("mobileNumber", { required: true, maxLength: 20 })}
                    error={errors?.mobileNumber}
                    helperText={errors?.mobileNumber?"Mobile Number is required":""}
                />
            </div>
            <div className='address-buttons'>
                <div className="form-input-wrapper">
                    {/* <p onClick={cancelFormHandler}>
                        Cancel
                    </p> */}
                    <Button color="warning" onClick={cancelFormHandler} variant="contained" fullWidth  style={{padding:'10px'}}>
                       cancel
                    </Button>
                </div>
               
                <div className="form-input-wrapper">
                    <Button color="info" variant="contained" fullWidth type="submit" style={{padding:'10px'}}>
                        Save Address
                    </Button>
                </div>
                
            </div>
            
        </form>
    );
}


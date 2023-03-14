import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddressForm from './AddressForm'
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
export default function SavedAddressRow({address}) {
    const dispatch = useDispatch();
    const addressState = useSelector(state=>state.address); 
    let [openEditAddress,setOpenEditAddress] = useState(false);
    
    const editAddress = () => {
        setOpenEditAddress(!openEditAddress);
    }
    const deleteAdress = ()=>{
        dispatch({type:'DELETE_ADDRESS',payload:address});   
    }

    const cancelHandler = ()=>{
        setOpenEditAddress(false);
    }
    const succuessHandler  = (updatedAddress) => {  
        console.log("call the api to update the address",updatedAddress);
        updatedAddress = {...updatedAddress, id:address.id};
        dispatch({type:'UPDATE_ADDRESS',payload:updatedAddress});
    }
    useEffect(()=>{
        console.log("addressState.isAddressUpdated--------->",addressState.isAddressUpdated);
        if(addressState.isAddressUpdated){
            setOpenEditAddress(false);
        }
    },[addressState.isAddressUpdated])


    const AddressHtml = ()=>{
        return(
            <div>
                <p>
                    {address.firstName} {address.lastName}<br></br>
                    {address.address}<br></br>
                    {address.city} - {address.pincode}<br></br>
                    {address.country}<br></br>
                    Mobile No- {address.mobileNumber}
                </p>

                <Button variant="text"  onClick={editAddress}>Edit</Button>
                <Button variant="text"  onClick={deleteAdress} color="error">DELETE</Button>
            </div>
        );
    }
  

    return (
        <div>
            {   
                openEditAddress?
                <AddressForm 
                    address={address} 
                    successHandler={succuessHandler} 
                    cancelHandler={cancelHandler} 
                />
                :
                <AddressHtml/>
            }
        </div>
    )
}

import * as React from 'react';
import SavedAddressRow from './SavedAddressRow';
import { getAddress } from '../../../Services/HttpApiCall';
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
export default function SavedAddresses({fetchRepeat,setFetchRepeat}) {

    const dispatch = useDispatch();
    const addressState = useSelector(state=>state.address);
    const [addresses,setAddresses] = useState([]);


    const fetchAddress = async () => {
        let response = await getAddress();
        setAddresses(response.data.payload);
    }

    useEffect(()=>{
        if(addressState.isAddressDeleted == true){
            setFetchRepeat(fetchRepeat=>parseInt(fetchRepeat)+1);
            dispatch({type:'ADDRESS_DELETED',payload:{isAddressDeleted:false}});
        }
    },[addressState.isAddressDeleted]);

    useEffect(()=>{
        if(addressState.isAddressUpdated == true){
            setFetchRepeat(fetchRepeat=>parseInt(fetchRepeat)+1);
            dispatch({type:'ADDRESS_UPDATED',payload:{isAddressUpdated:false}});
        }
    },[addressState.isAddressUpdated]);

    useEffect(()=>{
        if(addressState.isAddressAdded == true){
            setFetchRepeat(fetchRepeat=>parseInt(fetchRepeat)+1);
            dispatch({type:'ADDRESS_ADDED',payload:{isAddressAdded:false}});
        }
    },[addressState.isAddressAdded]);

    


  //fetch saved address
  useEffect(fetchAddress,[fetchRepeat]);
    return( 
        <div>
            {addresses.map(element => {
                return <SavedAddressRow address={element} />
            })}
            
        </div>
    );   
}

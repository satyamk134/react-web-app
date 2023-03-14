import AddressForm from './AddressForm'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SavedAddresses from './SavedAddress';
import { useDispatch, useSelector } from 'react-redux';

const Address = () => {

    const dispatch = useDispatch();
    const addressState = useSelector(state=>state.address);

    const [toAddAddress,setToAddAddress] = useState(false);
    const [fetchRepeat,setFetchRepeat] = useState(0);
    const putAddressForm = () => {
        setToAddAddress(!toAddAddress);
    }
    const succuessHandler = (address) => {
        dispatch({type:'ADD_ADDRESS',payload:address});
    }

    const cancelHandler = ()=>{
        setToAddAddress(false);
    }

    useEffect(()=>{
        if(addressState.isAddressAdded == true){
            setToAddAddress(false);
            dispatch({type:'ADDRESS_ADDED',payload:{isAddressAdded:false}});
            setFetchRepeat(fetchRepeat=>parseInt(fetchRepeat)+1);
            
        }
    },[addressState.isAddressAdded])




    return <div>
                <p onClick={putAddressForm}>Click here to add address</p>
                {toAddAddress?
                    <AddressForm 
                        successHandler={succuessHandler} 
                        cancelHandler={cancelHandler} 
                    />:""
                }
                <SavedAddresses fetchRepeat={fetchRepeat} setFetchRepeat={setFetchRepeat} />
            </div>
    
}
export default Address
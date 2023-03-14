import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import AddressCard from '../Cusomter/Address/AddressCard';
import { getAddress } from '../../Services/HttpApiCall'
import { useEffect,useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

export default function SelectAddress() {

    const [selectedAddress,setSelectedAddress] = useState("");
    const [addresses,setAddresses] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const orderState = useSelector(state=>state.order);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        dispatch({type:'PLACE_ORDER', payload:orderState});  
    };

    useEffect(() => {
        if(orderState.status == 'SUCCESS'){
            history.push('/app/order-success');

        }else if(orderState.status == 'ERROR'){
            alert("Error in placing the order");
        }
    },[orderState.status]);


    const fetchAddress = async () => {
        let response = await getAddress();
        setAddresses(response.payload);
        if(response.payload.length>0){
            setSelectedAddress(0);
        }
        
    }
    const selectHandler = (event) => {
        let addressId = addresses[event.target.value].id;
        dispatch({type:"SET_PICKUP_ADDRESS",payload:{addressId:addressId}});
        setSelectedAddress(event.target.value);
        
    }


    useEffect(fetchAddress,[]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" key="address">Select Address</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="address"
                    {...register("address")}
                    value={selectedAddress}
                    onChange={selectHandler}
                >
                    {addresses.map((element,index)=>(<FormControlLabel  key={"address"+element.id}
                        {...register("address")}
                        value={index} 
                        control={<Radio />} 
                        label={<AddressCard address={element} 
                        id={element.id}
                        />} 
                        />)
                    )}
                </RadioGroup>
                <Button type="submit" variant="contained" color="secondary">Place your Order</Button>
            </FormControl>
            
            
        </form>
    );
}


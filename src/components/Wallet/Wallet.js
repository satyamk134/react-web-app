import React from "react";
import { useEffect,useState } from "react";
import {walletApi} from '../../Services/HttpApiCall'
import Box from '@mui/material/Box'
import Transactions from './Transactions';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
export default function Wallet(){
    const [walletBalance,setWalletBalance] = useState(0);
    const [transactionVolumes,setTransactionVolumes] = useState([]); 
    const history = useHistory();
    useEffect(()=>{
        walletApi.get()
        .then(response=>{
            console.log(response);
            let payloadRes = response.data.payload.WalletTransactions;
            let balance = response.data.payload.balance;
            setWalletBalance(balance);
            setTransactionVolumes(payloadRes);
        })
    },[]);
    
    const goToWalletWithdraw = ()=>{
        history.push('/app/delivery/wallet/withdraw')
    }
    
    return (
        <Box sx={{display:'flex', flexDirection:'row',width:'100%'}}>
            <Box sx={{flexGrow:"0.3",fontWeight: 'bold'}}>
                <div>Your Wallet </div>
                <Typography>Balance   </Typography>
                <Typography><CurrencyRupeeIcon /> {walletBalance}</Typography>
                <Button variant="contained" onClick ={goToWalletWithdraw} color="success" sx={{color:'white',mt:'100px'}}>
                    Withdraw
                </Button>
            </Box>
            <Box sx={{flexGrow:"0.7",fontWeight: 'bold'}}>
                <p>Recent Transcations</p>
                {transactionVolumes.map(element=>(<Transactions row={element}/>))}
            </Box>
        </Box>
        
    )
}
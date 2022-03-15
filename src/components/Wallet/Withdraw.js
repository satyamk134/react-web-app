import React from "react";
import { useEffect, useState } from "react";
import { walletApi } from '../../Services/HttpApiCall'
import Box from '@mui/material/Box'
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Transactions from './Transactions';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@material-ui/core/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import WarningAlert from '../../ui-components/WarningAlert';

import * as yup from 'yup';
export default function Withdraw() {
    const [walletBalance, setWalletBalance] = useState(0);
    const [transactionVolumes, setTransactionVolumes] = useState([]);
    const [isAlertOn,setAlertOn] = useState(false); 
    const [alertMsg,setAlertMsg] = useState("sample msg"); 

    const validationSchema = yup.object({
        amount: yup
            .number('Enter Amount')
            .moreThan(0)
            .required('Amount is mandatry'),
        account: yup
            .string('Please select Account')
            .required('Account is required'),
    });

    const formik = useFormik({
        initialValues: {
            amount: '0',
            account: 'sbi'
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log("values are",values);
            let reqPayload = {
                ...values,
                action:"sub",
                description:"Bank Transfer",
                source:"wallet",
                code:'wtb'
            }
            walletApi.withdraw(reqPayload)
            .then(response=>{
                console.log("tranfer to bank is successfull");
            });
            //loginMethods.handleLogin();
        },
    });
    useEffect(() => {
        walletApi.get()
            .then(response => {
                console.log(response);
                let payloadRes = response.data.payload.WalletTransactions;
                let balance = response.data.payload.balance;
                setWalletBalance(balance);
            })
    }, []);

    const alertPopup = {
        success:()=>{
            console.log("success call back called");
            setAlertOn(false);
        },
        failure:()=>{
            setAlertOn(false);
        }
    }
    const withdrawAlert = ()=>{
        setAlertMsg("This is message regarding your withdraw");
        setAlertOn(true);
    }

    return (
        <Box>
            <div>Withdraw Request </div>
            <Typography>Wallet Balance   </Typography>
            <Typography><CurrencyRupeeIcon /> {walletBalance}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{display:"flex"}}>
                    <Box sx={{flex:0.4,display:'flex',flexDirection:'column'}}>
                        <TextField label="Amount" variant="standard" id="amount"
                            name="amount"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.emailId}
                            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-bank-account">Bank Account</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="sbi"
                                name="account"
                                id="account"
                            >
                                <FormControlLabel value="sbi" control={<Radio />} label="State Bank of India" /> <BankAccount />
                                <FormControlLabel value="boi" control={<Radio />} label="Bank of India" /><BankAccount />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{flex:0.6}}>
                        <Button variant="outlined" type="submit" color="success">COMPLETE Withdraw</Button>
                    </Box>
                    
                </Box>
                
               
            </form>
            <WarningAlert open={isAlertOn} msg={alertMsg}
                successCallback={alertPopup.success} 
                failureCallBack={alertPopup.failure} 
            />
        </Box>
    )
}

const BankAccount = ()=>{
    return (
            <Card sx={{ width:"60%"  }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    SATYAM KUMAR
                    </Typography>
                    <Typography variant="h5" component="div">
                    545487478457
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    ISFC- SBIN003434
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">EDIT</Button>
                </CardActions>
            </Card>
    )
}


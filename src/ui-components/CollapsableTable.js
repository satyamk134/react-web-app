import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddMoreClothes from '../ui-components/AddMoreDialog' 
import {getOrdersTobePicked, getOrderDetails} from '../Services/HttpApiCall';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [rowDetails,setRowDetails] = React.useState([]);
  const dispatch = useDispatch();
  const openAddServicesHandler = () =>{
    dispatch({type:"SET_ADD_CLOTH_STATUS",payload:{isUpdateOrderOpen:true,selectedOrderId:row.orderId}});
  }
  const [isAddClothesOpen, setAddClothesOpen] = React.useState(false);
  useEffect(()=>{
    if(open){
      //fetch the details
      getOrderDetails({orderId:row.orderId})
      .then(response=>{
          row.details = response.data;
          setRowDetails(response.data);
      });
    }
    
  },[open]);
  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    
                    <TableCell >Service Type</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell><Button variant="outlined" onClick={openAddServicesHandler} >Add</Button></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowDetails.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.clothType}
                      </TableCell>
                      <TableCell>{historyRow.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        service: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        unit:PropTypes.string.isRequired
      }),
    ),
  }).isRequired,
};

export default function CollapsibleTable() {
  let userInfo = useSelector(selectUser);
  const [rows,setTableRows] = React.useState([]);
  
  useEffect(()=>{
    console.log("fetch the order details");
    if(userInfo.isLoggedIn){
      getOrdersTobePicked()
      .then(response=>{
        let tableRows = response.data.map(el=>({...el,details:[]}));
        setTableRows(tableRows);
        console.log("order details are",response.data);
      })
    }
    
  },[userInfo.isLoggedIn])
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>OrderId</TableCell>
              <TableCell>Customer Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddMoreClothes />
    </div>
  );
}



const selectUser = state => state.user;
const cssStyles = {
  'orderDetails':{
    display:'flex',
    justifyContent: 'space-between'
  }
}

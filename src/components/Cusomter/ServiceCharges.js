import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react';

const TAX_RATE = 0.18;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [];

export default function ServiceCharges(props) {
  const {particulars,unit} = props.service;
  const rowCost = particulars.map(el=>el.serviceDetail.price*el.count).reduce((sum,el)=>(el+sum),0);

  //const prices = particulars.map(el=>el.price);

  console.log("particulars are",particulars);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {particulars.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.serviceDetail.cloth}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.serviceDetail.price)}</TableCell>
              <TableCell align="right">{ccyFormat(row.serviceDetail.price*row.count)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(rowCost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(rowCost*TAX_RATE)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(rowCost+(rowCost*TAX_RATE))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

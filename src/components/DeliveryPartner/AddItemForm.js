import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { orderDetails,addWeighForClothes } from '../../Services/HttpApiCall';
import { useDispatch, useSelector } from 'react-redux';

const AddItemForm = (props) => {

  
  //formik.initialValues = {...formik.initialValues,...{clothServiceId:firstId}};

  return (
    <div>
      <QuantityForm {...props} />
    </div>
  );
};
const ParticulatsForm = (props) => {

  const { orderId, serviceName, serviceId, serviceOptions, unit,particulars,OrderParticulars,setParticulars } = props;
  const dispatch = useDispatch();
  let firstId = 0;
  if (serviceOptions.length) {
    firstId = serviceOptions[0].id;
    console.log("came for length", firstId);
    //setInitialCloth(firstId);

  }

  const validationSchema = yup.object({
    clothServiceId: yup
      .string('Select cloth type')
      .required('Cloth  is required'),
    quantity: yup
      .number('Enter Qantity')
      .required('Qunatity is required'),
  });

  const formik = useFormik({
    initialValues: {
      clothServiceId: "",
      quantity: '5',
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      //save to order detailss table
      let request = {
        serviceDetailId:values.clothServiceId,
        count:values.quantity,
        serviceId:serviceId
      };
      let createdParticlar = await orderDetails.add(request);
      console.log("new particulars",particulars);
      let updateParticulars = [ createdParticlar.data.payload.particulars[0],...particulars]
      setParticulars(updateParticulars);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box sx={{ width: "30%" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Choose Item</InputLabel>
            <Select
              labelId="clothServiceId"
              id="clothServiceId"
              value={formik.values.clothServiceId}
              label="clothServiceId"
              name="clothServiceId"
              onChange={formik.handleChange}
            >

              {

                serviceOptions.map(element => (<MenuItem value={element.id}>{element.cloth}</MenuItem>))
              }

            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            id="quantity"
            name="quantity"
            label="quantity"
            type="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange} quantity
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </Box>
        <Box>
          <Button color="primary" variant="contained" size="large" margin="normal" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>



      </Box>
    </form>);
}

const QuantityForm = (props) => {

  const { orderId, serviceName, serviceId, serviceOptions, unit,particulars,OrderParticulars,setParticulars } = props;
  const [showParticulars, setShowParticulars] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    weight: yup
      .string('Please Enter weight')
      .required('Weight is required')
  });
  const formik = useFormik({
    initialValues: {
      weight: '5',
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      //save to order detailss table
      setShowParticulars(true);
      let request = {
        ...values, 
        serviceId: serviceId,
        quantity:values.weight
      };
      await addWeighForClothes(request);
    },
  });


  if (unit == 'kg') {
    return (
      <Box>


        <form onSubmit={formik.handleSubmit} >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box sx={{ width: "30%" }}>
              <TextField
                fullWidth
                margin="normal"
                id="weight"
                name="weight"
                label="weight"
                type="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            </Box>
            <Box>
              <Button color="primary" variant="contained" size="large" margin="normal" sx={{ mt: 3 }}>
                Add wight
              </Button>
            </Box>
          </Box>
        </form>
        {showParticulars == true &&
          <ParticulatsForm {...props} />
        }

      </Box>
    )
  } else {
    return <ParticulatsForm {...props} />
  }

}
export default AddItemForm

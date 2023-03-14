import React, { useEffect, useState } from 'react';
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
import { orderDetails, addWeighForClothes } from '../../Services/HttpApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import '../css/addItem-form.css'
import { element } from 'prop-types';
const AddItemForm = (props) => {
  const dispatch = useDispatch();
  const { serviceName, clothes } = props;
  console.log("clothes are", clothes);
  let addedClothItems = clothes.filter(element => element.count > 0 && element.unit == 'PER_ITEM').map(element => {
    return { id: element.id, count: element.count }
  });
  let addMiscClothItems = clothes.filter(element => element.count > 0 && element.unit == 'PER_KG').map(element => {
    return { id: element.id, count: element.count }
  });

  const { handleSubmit, control, resetField, reset, watch } = useForm({});
  const { fields: specifiClothes, append, remove, update } = useFieldArray({
    control,
    name: "clothItem"
  });
  const { fields: miscClothes, append: appnedForMisc, remove: removeForMisc } = useFieldArray({
    control,
    name: "miscItem"
  });
  useEffect(() => {
    reset({ clothItem: addedClothItems, miscItem: addMiscClothItems });
  }, [clothes])

  const saveCurrentAddedClothes = (updatedItems) => {
    dispatch({ type: 'SAVE_CUSTOMER_CLOTH_COUNT', payload: updatedItems })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(data => saveCurrentAddedClothes(data))}>
        <div>
          <h3>
            {serviceName}
            <IconButton color="primary" aria-label="add to shopping cart" type="submit">
              <SaveIcon />
            </IconButton>
          </h3>
          <div className='add_items_wrapper'>
            <div>
              <h4>
                Miscellinious Clothes
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => appnedForMisc({ name: "", count: "" })}>
                  <AddIcon />
                </IconButton>
              </h4>
              <div className='add_item_form_particulars'>
                <div>
                  <Controller
                    render={({ field }) => <TextField id="standard-basic" label="weight" variant="standard" {...field} />
                    }
                    name="weight"
                    control={control}
                  />
                  <div>

                  </div>
                </div>

                <div className="add_item_form_particulars__items__header">
                  <h5>Item</h5>
                  <h5>count</h5>
                </div>

                {
                  miscClothes.map((item, index) => (
                    <div className='add_item_form_particulars__items' key={index}>
                      <Controller
                        render={({ field: { onChange, value } }) => <FormControl fullWidth>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Cloth Type"
                            variant="standard"
                            name={`miscItem.${index}.name`}
                            onChange={(value) => { onChange(value); }}
                            value={value}
                          >
                            {clothes.filter(element => element.unit == 'PER_KG').map((cloth, index) => (<MenuItem key={index} value={cloth.id}>{cloth.cloth}</MenuItem>))}
                          </Select>
                        </FormControl>
                        }
                        name={`miscItem.${index}.id`}
                        control={control}
                      />
                      <Controller
                        render={({ field: { onChange, value } }) =>
                          <FormControl fullWidth>
                            <TextField variant="standard" value={value} onChange={(value) => { onChange(value); }} />
                          </FormControl>
                        }
                        name={`miscItem.${index}.count`}
                        control={control}
                      />
                    </div>
                  )
                  )
                }
              </div>
            </div>

            <div>
              <h4>
                Specific Clothes
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => append({ name: "", count: "" })}>
                  <AddIcon />
                </IconButton>
              </h4>
              <div className='add_item_form_particulars'>
                <div className="add_item_form_particulars__items__header">
                  <h5>Item</h5>
                  <h5>count</h5>
                </div>

                {
                  specifiClothes.map((item, index) => (
                    <div className='add_item_form_particulars__items' key={index}>
                      <Controller
                        render={({ field: { onChange, value } }) => <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Cloth Type"
                            variant="standard"
                            onChange={(value) => { onChange(value); }}
                            value={value}
                          >
                            {clothes.filter(element => element.unit == 'PER_ITEM').map((cloth, index) => (<MenuItem key={index} value={cloth.id}>{cloth.cloth}</MenuItem>))}
                          </Select>
                        </FormControl>
                        }
                        name={`clothItem.${index}.id`}
                        control={control}
                      />
                      <Controller
                        render={({ field: { onChange, value } }) => <FormControl fullWidth>
                          <TextField variant="standard" value={value} onChange={(value) => { onChange(value); }} />
                        </FormControl>
                        }
                        name={`clothItem.${index}.count`}
                        control={control}
                      />
                    </div>
                  )
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


export default AddItemForm



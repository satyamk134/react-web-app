import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  './css/order-summary.css'
export default function OrderSummary({ cart,merchantName }) {
  console.log("cart is", merchantName);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <div className='cart-item-summary'>
        <h3>{merchantName}</h3>
      </div>
      
      {cart.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <div className='cart__item_wrapper'>
            <p>{value.detail.name}</p>
            <DeleteOutlineIcon className='cart__item_icon_delete_icon'/>
          </div>
        );
      })}
    </List>
  );
}

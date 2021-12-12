import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function BasicList({handlers}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#F7F7F7' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handlers.ongoing}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText   >In Progress</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handlers.pickup}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText   primary="Pick Up" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handlers.delivery}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText   primary="For Delivery" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

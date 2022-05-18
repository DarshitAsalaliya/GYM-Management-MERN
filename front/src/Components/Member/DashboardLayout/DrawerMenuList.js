import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Navbar
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

import '../../Utils/GlobalStyle.css';

export default function DrawerMenuList() {
 
  const navigate = useNavigate();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => navigate("./", { replace: true })}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageMembers", { replace: true })}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="My Diet Plan" className='sideMenuTextStyle'/>
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageInvoices", { replace: true })}>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="My Invoices" className='sideMenuTextStyle' />
      </ListItemButton>
    </List>
  );
}

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

  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index === 0)
      navigate("./", { replace: true });
    else if (index === 1)
      navigate("./ManageMembers", { replace: true });
    else if (index === 2)
      navigate("./ManageInvoices", { replace: true });

  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="My Diet Plan" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="My Invoices" className='sideMenuTextStyle' />
      </ListItemButton>
    </List>
  );
}

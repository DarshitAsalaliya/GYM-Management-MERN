import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Navbar
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// Global CSS
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
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Members" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageInvoices", { replace: true })}>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Invoices" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageTrainers", { replace: true })}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Trainers" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageMemberships", { replace: true })}>
        <ListItemIcon>
          <CollectionsBookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Memberships" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageSupplements", { replace: true })}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Supplements" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("./ManageLeads", { replace: true })}>
        <ListItemIcon>
          <QueryStatsIcon />
        </ListItemIcon>
        <ListItemText primary="Leads" className='sideMenuTextStyle' />
      </ListItemButton>
    </List>
  );
}

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

  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index === 0)
      navigate("./", { replace: true });
    else if (index === 1)
      navigate("./ManageMembers", { replace: true });
    else if (index === 2)
      navigate("./ManageInvoices", { replace: true });
    else if (index === 3)
      navigate("./ManageTrainers", { replace: true });
    else if (index === 4)
      navigate("./ManageMemberships", { replace: true });
    else if (index === 5)
      navigate("./ManageSupplements", { replace: true });
    else if (index === 6)
      navigate("./ManageLeads", { replace: true });
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
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Members" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Invoices" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Trainers" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <CollectionsBookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Memberships" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Supplements" className='sideMenuTextStyle' />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)}>
        <ListItemIcon>
          <QueryStatsIcon />
        </ListItemIcon>
        <ListItemText primary="Leads" className='sideMenuTextStyle' />
      </ListItemButton>
    </List>
  );
}

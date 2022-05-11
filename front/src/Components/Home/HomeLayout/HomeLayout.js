import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Navbar
import { NavLink, Outlet } from 'react-router-dom';

// Style
import './HomeStyle.css';

const HomeLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/" className='Nav-Item'>GYM Management</NavLink>
            </Typography>
            
            <NavLink to="/Login" className='Nav-Item'>Login</NavLink>
            
          </Toolbar>
        </AppBar>
        
      </Box>
      
      <Outlet />
    </>
  );
}

export default HomeLayout
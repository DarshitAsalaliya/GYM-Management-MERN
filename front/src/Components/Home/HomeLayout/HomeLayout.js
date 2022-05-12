import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import Navbar from './Navbar';
import Footer from './Footer';
// Navbar
import { NavLink, Outlet } from 'react-router-dom';

// Style
import './HomeStyle.css';

const HomeLayout = () => {


  return (
    <>
      <Navbar />
    
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout
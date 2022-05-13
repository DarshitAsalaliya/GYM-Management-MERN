import React, { useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';

import SnackbarMsg from '../../Utils/SnackbarMsg';

// Constants
import * as constants from '../../../Redux/constants/userConstants';

// Navbar
import { NavLink, Outlet } from 'react-router-dom';

// Style
import './HomeStyle.css';

const HomeLayout = () => {

  const dispatch = useDispatch();

  const { changepasswordafterotpsuccess } = useSelector(state => state.changepasswordafterotp);

  useEffect(() => {
    // Reset
    dispatch({
      type: constants.CHANGE_PASSWORD_AFTER_OTP_RESET
    });
  }, [])

  return (
    <>
      {changepasswordafterotpsuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="New password sent to your email.." severity="success" />}
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout
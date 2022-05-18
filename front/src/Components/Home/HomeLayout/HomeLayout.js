import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import { useSelector, useDispatch } from 'react-redux';

import SnackbarMsg from '../../Utils/SnackbarMsg';

// Constants
import * as constants from '../../../Redux/constants/userConstants';

// Navbar
import { Outlet } from 'react-router-dom';

// Style
import './HomeStyle.css';

const HomeLayout = () => {

  const dispatch = useDispatch();

  const { changepasswordafterotpsuccess } = useSelector(state => state.changepasswordafterotp);

  // Reset
  useEffect(() => {
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
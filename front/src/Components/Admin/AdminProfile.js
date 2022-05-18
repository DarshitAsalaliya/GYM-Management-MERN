import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import SnackbarMsg from '../Utils/SnackbarMsg';

// Navbar
import { useNavigate } from 'react-router-dom';

// Card
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Style
import '../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../Redux/constants/userConstants';

import * as Yup from 'yup';
// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getLoggedUserData, changePassword } from '../../Redux/actions/userAction';

const { REACT_APP_BASE_URL } = process.env;

export default function AdminProfile() {

  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  const { userdata, getdatasuccess } = useSelector(state => state.loggeduserdata);
  const { changepasswordsuccess, changepassworderror } = useSelector(state => state.changepassword);

  // Load Data
  useEffect(() => {
    dispatch(getLoggedUserData('Admin'));
  }, []);

  useEffect(() => {
    userdata && setUserData(userdata);
  }, [userdata]);

  useEffect(() => {
    dispatch({ type: constants.CHANGE_PASSWORD_RESET });
  }, [])

  // Validation
  const ValidationSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    newpassword: Yup.string()
      .required('Required')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password should be contain letters and numbers.'),
    confirmpassword: Yup.string()
      .required('Required')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password should be contain letters and numbers.')
      .oneOf([Yup.ref('newpassword'), null], 'Password must match'),
  });

  return (
    <>
      {changepasswordsuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Password Changed Successfully.." severity="success" />}
      {changepassworderror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={changepassworderror} severity="error" />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" className='moduleHeading'>
              Admin Profile
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar alt="Cindy Baker" src={userData?.image?.image_url} sx={{ width: 80, height: 80 }} />
                  }
                  title={userData?.email}
                  subheader={userData?.createdAt}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" className='moduleHeading'>
              Change Password
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Card sx={{ maxWidth: 345, padding: 2 }} variant="outlined">
                <Formik
                  initialValues={{ email: '', password: '', newpassword: '', confirmpassword: '' }}
                  validationSchema={ValidationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    values.email = userData?.email;
                    // Reset
                    await dispatch({
                      type: constants.CHANGE_PASSWORD_RESET
                    });

                    await dispatch(changePassword('Admin', values));

                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>

                      <Grid container spacing={3} sx={{ textAlign: 'center' }}>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            error={errors.password && touched.password}
                            helperText={errors.password}
                            sx={{ width: '100%' }}
                          />

                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="newpassword"
                            name="newpassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newpassword}
                            label="New Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            error={errors.newpassword && touched.newpassword}
                            helperText={errors.newpassword}
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="confirmpassword"
                            name="confirmpassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmpassword}
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            error={errors.confirmpassword && touched.confirmpassword}
                            helperText={errors.confirmpassword}
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Button type="submit" variant="outlined" color="info" disabled={isSubmitting} sx={{ width: '100%' }}>
                            Change Password
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>


    </>
  );
}

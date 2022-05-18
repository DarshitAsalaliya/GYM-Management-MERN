import { useEffect, useState } from 'react';
import { Button, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import SnackbarMsg from '../Utils/SnackbarMsg';

// Card
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

// Style
import '../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UpdateMember from './Member/UpdateMember';
// Constants
import * as constants from '../../Redux/constants/userConstants';
import * as memberconstants from '../../Redux/constants/memberConstants';

import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getLoggedUserData, changePassword } from '../../Redux/actions/userAction';

export default function MemberProfile() {

  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  const { userdata, getdatasuccess } = useSelector(state => state.loggeduserdata);
  const { changepasswordsuccess, changepassworderror } = useSelector(state => state.changepassword);
  const { updateloading, updateerror, updatesuccess } = useSelector(state => state.updatemember);

  // Load Data
  useEffect(() => {
    dispatch(getLoggedUserData('Member'));
  }, [updatesuccess]);

  useEffect(() => {
    userdata && setUserData(userdata);
  }, [userdata]);


  useEffect(() => {
    dispatch({ type: constants.CHANGE_PASSWORD_RESET });
    dispatch({ type: memberconstants.MEMBER_UPDATE_RESET });
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
      {updatesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Updated Successfully.." severity="info" />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" className='moduleHeading'>
              Member Profile
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
                <Divider />
                <CardContent>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>GYM Time:</b> {userData?.workouttime}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Status:</b> {userData?.status ? 'Active' : 'Inactive'} | <b>Gender:</b> {userData?.gender?.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>

                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Joining Date:</b> {userData?.doj?.slice(0, 10)}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Birth Date:</b> {userData?.dob?.slice(0, 10)}
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Height:</b> {userData?.height} CM
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Weight:</b> {userData?.weight} KG
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Blood:</b> {userData?.bloodgroup}
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Phone:</b> {userData?.phone}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    <b>Address:</b> {userData?.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  {userData && <UpdateMember dataforupdate={userData} />}
                </CardActions>
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
                    // Add
                    await dispatch({
                      type: constants.CHANGE_PASSWORD_RESET
                    });

                    await dispatch(changePassword('Member', values));

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

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import EmailIcon from '@mui/icons-material/Email';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useNavigate } from "react-router-dom";

// Constants
import * as constants from '../../Redux/constants/userConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { forgotPasswordSendOtp } from '../../Redux/actions/userAction';

// Snackbar
import SnackbarMsg from '../Utils/SnackbarMsg';

import EnterOTP from './EnterOTP';

const theme = createTheme();

export default function ForgotPassword() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.userauth);
    const { forgotpasswordsuccess, forgotpassworderror } = useSelector(state => state.forgotpasswordsendotp);



    useEffect(() => {
        success && navigate("/Dashboard/Admin", { replace: true });
    }, [success, navigate]);

    // Form Data State
    const [formData, setFormData] = useState({
        userEmail: ''
    });

    // Form Field Change Events
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // Tab Changed
    const [userType, setUserType] = React.useState('Member');
    const [tabIndex, setTabIndex] = React.useState(0);

    const [formType, setFormType] = React.useState('ForgotForm');

    const handleChangeUserType = (event, newTabIndex) => {
        if (newTabIndex === 0) {
            setUserType('Member');
        }

        if (newTabIndex === 1) {
            setUserType('Trainer');
        }

        if (newTabIndex === 2) {
            setUserType('Admin');
        }
        setTabIndex(newTabIndex);
    };

    // Form Submit Event
    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset
        dispatch({
            type: constants.FORGOT_PASSWORD_SEND_OTP_RESET
        });

        dispatch(forgotPasswordSendOtp(userType, { email: formData.userEmail }));

    };

    useEffect(() => {
        forgotpasswordsuccess && setFormType('EnterOTPForm');
    }, [forgotpasswordsuccess, navigate]);

    useEffect(() => {
        setFormType('ForgotForm');

        // Reset
        dispatch({
            type: constants.FORGOT_PASSWORD_SEND_OTP_RESET
        });

    }, []);

    return (
        <ThemeProvider theme={theme}>
            {forgotpassworderror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={forgotpassworderror} severity="error" />}
            {formType === 'ForgotForm' ? <Grid container component="main" mt={2} mb={2} sx={{ height: 'auto' }}>
                <Grid
                    item
                    xs={1}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={10} sm={8} md={4} sx={{ border: '1px solid #e9e6e6' }} square>
                    <Box
                        sx={{
                            my: 2,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Tabs value={tabIndex} onChange={handleChangeUserType} centered variant="fullWidth">
                            <Tab label="Member" />
                            <Tab label="Trainer" />
                            <Tab label="Admin" />
                        </Tabs>
                        <Avatar sx={{ m: 1, bgcolor: '#3384ff' }}>
                            <EmailIcon fontSize='small' />
                        </Avatar>
                        <Typography component="h1" variant="h6" sx={{ color: '#474747' }}>
                            Forgot Password
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userEmail"
                                label="Email Address"
                                name="userEmail"
                                autoComplete="off"
                                autoFocus
                                variant="standard"
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Code
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => navigate('/Login')} variant="body2" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                        Back To Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid> : <EnterOTP data={{ userEmail: formData.userEmail }} resendSubmit={handleSubmit} />}
        </ThemeProvider>
    );
}
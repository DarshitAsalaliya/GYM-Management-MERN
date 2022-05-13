import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useNavigate } from "react-router-dom";

// Constants
import * as constants from '../../Redux/constants/userConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { changePasswordAfterOtp } from '../../Redux/actions/userAction';

// Snackbar
import SnackbarMsg from '../Utils/SnackbarMsg';

const theme = createTheme();

export default function EnterOTP(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.userauth);

    const { changepasswordafterotperror, changepasswordafterotpsuccess } = useSelector(state => state.changepasswordafterotp);

    useEffect(() => {
        success && navigate("/Dashboard/Admin", { replace: true });
    }, [success, navigate]);

    useEffect(() => {
        // Reset
        dispatch({
            type: constants.CHANGE_PASSWORD_AFTER_OTP_RESET
        });

        startTimer(60 * 2);
    }, []);

    // Form Data State
    const [formData, setFormData] = useState({
        userOTP: ''
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
        debugger;
        // Reset
        dispatch({
            type: constants.CHANGE_PASSWORD_AFTER_OTP_RESET
        });

        dispatch(changePasswordAfterOtp(userType, { email: props.data?.userEmail, otp: formData.userOTP }));

    };

    useEffect(() => {
        changepasswordafterotpsuccess && navigate("/Login", { replace: true });
    }, [changepasswordafterotpsuccess, navigate]);


    const [otpCounter, setOtpCounter] = useState('02:00');

    function startTimer(duration) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setOtpCounter(minutes + ":" + seconds);

            if (--timer < 0) {
                setOtpCounter('00:00');
            }
        }, 1000);
    }


    return (
        <ThemeProvider theme={theme}>
            {loading && <LinearProgress color="secondary" />}
            {changepasswordafterotperror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={changepasswordafterotperror} severity="error" />}
            <Grid container component="main" mt={2} sx={{ height: 'auto' }}>
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

                        <Avatar sx={{ m: 1, bgcolor: '#3384ff' }}>
                            <PasswordIcon fontSize='small' />
                        </Avatar>
                        <Typography component="h1" variant="h6" sx={{ color: '#474747' }}>
                            Enter OTP
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userOTP"
                                label="Enter OTP"
                                name="userOTP"
                                autoComplete="off"
                                autoFocus
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Validate OTP
                            </Button>
                            <Typography component="h1" variant="body2" sx={{ color: 'green',fontWeight:'bold' }}>
                                {otpCounter}
                            </Typography>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useSelector, useDispatch } from 'react-redux';

// Action
import { checkLogin } from '../../Redux/actions/userAction';

import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignInSide() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.user);

    useEffect(() => {
        success && navigate("/Dashboard/Admin", { replace: true });
    }, [success, navigate]);

    // Form Data State
    const [formData, setFormData] = useState({
        userEmail: '',
        userPassword: ''
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

    // Form Submit Event
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(checkLogin({ email: formData.userEmail, password: formData.userPassword }, userType));
    };



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

    return (
        <ThemeProvider theme={theme}>
            {loading && <LinearProgress color="secondary" />}
            <Grid container component="main" mt={4} sx={{ height: '75vh' }}>
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
                <Grid item xs={10} sm={8} md={4} component={Paper} elevation={4} square>
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.default' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        {userType} Login
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            {error && <Alert severity="error">Invalid User!</Alert>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userEmail"
                                label="Email Address"
                                name="userEmail"
                                autoComplete="off"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="userPassword"
                                label="Password"
                                type="password"
                                id="userPassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => navigate('/ForgotPassword')} variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
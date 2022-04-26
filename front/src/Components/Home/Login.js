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

    // Form Submit Event
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(checkLogin({ email: formData.userEmail, password: formData.userPassword }));
    };

    return (
        <ThemeProvider theme={theme}>
            {loading && <LinearProgress color="secondary" />}
            <Grid container component="main" mt={4} sx={{ height: '80vh' }}>
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
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.default' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
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
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
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
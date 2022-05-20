import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Constants
import * as constants from '../../../Redux/constants/membershipConstants';

// Yup
import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { createMembership } from '../../../Redux/actions/membershipAction';

// Snackbar
import SnackbarMsg from '../../Utils/SnackbarMsg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '40%', xs: '90%' },
    height: { md: '80%', xs: '80%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'scroll',
    p: 4,

};

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function AddMembership() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { registererror, registersuccess } = useSelector(state => state.createmembership);

    // Validation
    const ValidationSchema = Yup.object().shape({
        membershipname: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        duration: Yup.string().required('Required'),
        amount: Yup.number().positive('Invalid')
    });

    useEffect(() => {
        if (registersuccess) {
            setOpen(false);
        }
    }, [registersuccess]);

    return (
        <div>
            {registererror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={registererror} severity="error" />}

            <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />} size='small'>
                Add Membership
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={{ membershipname: '', duration: '', amount: 0, description: '', status: true }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            // Add
                            await dispatch({
                                type: constants.NEW_MEMBERSHIP_RESET
                            });

                            await dispatch(createMembership(values));

                            // Reset
                            await dispatch({
                                type: constants.MEMBERSHIP_LIST_RESET
                            });

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
                                        <Grid container spacing={3} >
                                            <Grid item xs={10} md={8} sx={{ textAlign: 'left' }}>
                                                <Typography variant="h6" gutterBottom component="div" >
                                                    Add Membership
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" color="error" onClick={handleClose} size='small'><ClearIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="membershipname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.membershipname}
                                            name="membershipname"
                                            label="Membership Name"
                                            variant="standard"
                                            autoComplete='off'
                                            error={errors.membershipname && touched.membershipname}
                                            helperText={errors.membershipname}
                                            sx={{ width: '100%' }} />

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="duration">Number of Month</InputLabel>
                                            <Select
                                                labelId="duration"
                                                id="demo-simple-select"
                                                name="duration"
                                                label="Duration"
                                                error={errors.duration && touched.duration}
                                                helperText={errors.duration}
                                                onChange={handleChange}
                                                defaultValue=""
                                            >
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="3">3</MenuItem>
                                                <MenuItem value="4">4</MenuItem>
                                                <MenuItem value="5">5</MenuItem>
                                                <MenuItem value="6">6</MenuItem>
                                                <MenuItem value="7">7</MenuItem>
                                                <MenuItem value="8">8</MenuItem>
                                                <MenuItem value="9">9</MenuItem>
                                                <MenuItem value="10">10</MenuItem>
                                                <MenuItem value="11">11</MenuItem>
                                                <MenuItem value="12">12</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="amount"
                                            type="number"
                                            onChange={handleChange}
                                            name="amount"
                                            label="Amount"
                                            variant="standard"
                                            error={errors.amount && touched.amount}
                                            helperText={errors.amount}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="description"
                                            onChange={handleChange}
                                            name="description"
                                            label="Description"
                                            variant="standard"
                                            error={errors.description && touched.description}
                                            helperText={errors.description}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                            label="Active"
                                            name="status"
                                            onChange={handleChange}
                                            value={values.status}
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Button type="submit" variant="contained" color="success" startIcon={<CheckIcon />} disabled={isSubmitting} sx={{ width: '80%' }}>
                                            Save
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}

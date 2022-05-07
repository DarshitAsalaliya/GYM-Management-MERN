import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import EditIcon from '@mui/icons-material/Edit';

// Constants
import * as constants from '../../../Redux/constants/invoiceConstants';

import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { updateInvoice } from '../../../Redux/actions/invoiceAction';

// Snackbar
import SnackbarMsg from '../../Utils/SnackbarMsg';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '70%',
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

export default function UpdateMembership(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { updateinvoiceerror, updateinvoicesuccess } = useSelector(state => state.updateinvoice);

    const ValidationSchema = Yup.object().shape({
        membershipid: Yup.string().required('Required'),
        startdate: Yup.date().required('Date of Birth is Required'),
        expirydate: Yup.date().required('Date of Join is Required'),
        totalamount: Yup.number().positive('Invalid'),
        paidamount: Yup.number().positive('Invalid'),
        paymentmode: Yup.string().required('Required'),
    });

    useEffect(() => {
        if (updateinvoicesuccess) {
            setOpen(false);
        }
    }, [updateinvoicesuccess]);

    // Fetch Membership List

    const [membershipList, setMembershipList] = useState([]);

    const fetchData = async () => {

        const { data } = await axios.get(REACT_APP_BASE_URL + 'api/Membership/GetActiveMembershipList');

        const filterData = data.map(function (obj) {
            obj['id'] = obj['_id'];
            delete obj['_id'];
            return obj;
        });

        setMembershipList(filterData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {updateinvoiceerror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={updateinvoiceerror} severity="error" />}

            <Button variant="outlined" color='primary' onClick={handleOpen}>
                <EditIcon fontSize="small" />
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={{ membershipid: props.dataforupdate.membershipid, paymentmode: props.dataforupdate.paymentmode, paymentdetail: props.dataforupdate.paymentdetail, startdate: props.dataforupdate.startdate.slice(0, 10), expirydate: props.dataforupdate.expirydate.slice(0, 10), totalamount: props.dataforupdate.totalamount, paidamount: props.dataforupdate.paidamount, status: props.dataforupdate.status }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            // Update
                            await dispatch({
                                type: constants.INVOICE_UPDATE_RESET
                            });

                            await dispatch(updateInvoice(props.dataforupdate.editid, values));

                            // Reset
                            await dispatch({
                                type: constants.INVOICE_LIST_RESET
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
                                                    Update Membership
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" color="error" onClick={handleClose} size='small'><ClearIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="membershipid">Membership</InputLabel>
                                            <Select
                                                labelId="membershipid"
                                                id="demo-simple-select"
                                                name="membershipid"
                                                label="Membership"
                                                error={errors.membershipid && touched.membershipid}
                                                helperText={errors.membershipid}
                                                onChange={handleChange}
                                                value={values.membershipid}
                                                defaultValue=""
                                            >
                                                {membershipList.map((obj) => {
                                                    return <MenuItem value={obj.id} key={obj.id}>{obj.membershipname}</MenuItem>
                                                })}

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="startdate"
                                            type="date"
                                            onChange={handleChange}
                                            name="startdate"
                                            variant="standard"
                                            value={values.startdate}
                                            error={errors.startdate && touched.startdate}
                                            helperText={errors.startdate || 'Start Date'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="expirydate"
                                            type="date"
                                            onChange={handleChange}
                                            name="expirydate"
                                            variant="standard"
                                            value={values.expirydate}
                                            error={errors.expirydate && touched.expirydate}
                                            helperText={errors.expirydate || 'Expiry Date'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="totalamount"
                                            type="number"
                                            onChange={handleChange}
                                            name="totalamount"
                                            label="Total Amount"
                                            variant="standard"
                                            value={values.totalamount}
                                            error={errors.totalamount && touched.totalamount}
                                            helperText={errors.totalamount}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="paidamount"
                                            type="number"
                                            onChange={handleChange}
                                            name="paidamount"
                                            label="Paid Amount"
                                            variant="standard"
                                            value={values.paidamount}
                                            error={errors.paidamount && touched.paidamount}
                                            helperText={errors.paidamount}
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="paymentmode">Payment Mode</InputLabel>
                                            <Select
                                                labelId="paymentmode"
                                                id="demo-simple-select"
                                                name="paymentmode"
                                                label="Payment Mode"
                                                error={errors.paymentmode && touched.paymentmode}
                                                helperText={errors.paymentmode}
                                                onChange={handleChange}
                                                value={values.paymentmode}
                                                defaultValue=""
                                            >
                                                <MenuItem value="GPay">GPay</MenuItem>
                                                <MenuItem value="Phone Pe">Phone Pe</MenuItem>
                                                <MenuItem value="Paytm">Paytm</MenuItem>
                                                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                                                <MenuItem value="Cheque">Cheque</MenuItem>
                                                <MenuItem value="Offline">Offline</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} mt={-1}>
                                        <TextField
                                            id="paymentdetail"
                                            onChange={handleChange}
                                            name="paymentdetail"
                                            label="Cheque No / UPI / Mobile No"
                                            variant="standard"
                                            value={values.paymentdetail}
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked={values.status} />}
                                            label="Active"
                                            name="status"
                                            onChange={handleChange}
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Button type="submit" variant="contained" color="info" startIcon={<CheckIcon />} disabled={isSubmitting} sx={{ width: '80%' }}>
                                            Update
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

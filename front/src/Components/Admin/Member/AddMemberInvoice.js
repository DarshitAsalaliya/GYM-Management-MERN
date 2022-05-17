import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Constants
import * as constants from '../../../Redux/constants/invoiceConstants';
import * as memberconstants from '../../../Redux/constants/memberConstants';

// Validator
import validator from 'validator';
import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { createInvoice, getInvoiceList } from '../../../Redux/actions/invoiceAction';

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


export default function AddMemberInvoice(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { createinvoiceloading, createinvoiceerror, createinvoicesuccess } = useSelector(state => state.createinvoice);

    const Input = styled('input')({
        display: 'none',
    });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const ValidationSchema = Yup.object().shape({
        membershipid: Yup.string().required('Required'),
        startdate: Yup.date().required('Start Date is Required'),
        expirydate: Yup
            .date()
            .required('Expiry Date is Required')
            .when(
                "startdate",
                (startdate, schema) => startdate && schema.min(startdate)),

        totalamount: Yup.number().required().positive('Invalid'),
        paidamount: Yup.number().max(Yup.ref('totalamount'), "Must be less than Total Amount"),
        paymentmode: Yup.string().required('Required')
    });

    useEffect(() => {
        if (createinvoicesuccess) {
            setOpen(false);
        }
    }, [createinvoicesuccess]);

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
            {createinvoiceerror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={createinvoiceerror} severity="error" />}

            <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />} size='small'>
                Invoice
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={{ membershipid: '', status: true, paymentmode: '', paymentdetail: '', startdate: new Date().toISOString().slice(0, 10), expirydate: '', totalamount: 0, paidamount: 0 }}
                        validationSchema={ValidationSchema}
                        onChange={async (values, { setSubmitting }) => {
                            values.memberprofileid = props.dataforupdate?._id

                        }}
                        onSubmit={async (values, { setSubmitting }) => {

                            values.memberprofileid = props.dataforupdate?._id

                            if (values.totalamount === values.paidamount)
                                values.status = true;
                            else
                                values.status = false;

                            // Add
                            await dispatch({
                                type: constants.NEW_INVOICE_RESET
                            });

                            await dispatch(createInvoice(values));

                            // Reset
                            await dispatch({
                                type: constants.INVOICE_LIST_RESET
                            });

                            // Reset
                            await dispatch({
                                type: memberconstants.MEMBER_LIST_RESET
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
                            setFieldValue,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <Grid container spacing={3} sx={{ textAlign: 'center' }}>
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={3} >
                                            <Grid item xs={10} md={8} sx={{ textAlign: 'left' }}>
                                                <Typography variant="h6" gutterBottom component="div" >
                                                    Create Invoice
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

                                                onChange={e => {
                                                    handleChange(e);

                                                    const selectedMembership = membershipList.find(d => d.id === e.target.value);

                                                    setFieldValue("totalamount", selectedMembership.amount);
                                                    setFieldValue("expirydate", new Date(new Date(values.startdate).setMonth(new Date(values.startdate).getMonth() + selectedMembership.duration)).toISOString().slice(0, 10))
                                                }}

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
                                            onChange={e => {
                                                handleChange(e);

                                                if (values?.membershipid) {

                                                    const selectedMembership = membershipList.find(d => d.id === values.membershipid);

                                                    setFieldValue("totalamount", selectedMembership.amount);
                                                    setFieldValue("expirydate", new Date(new Date(values.startdate).setMonth(new Date(values.startdate).getMonth() + selectedMembership.duration)).toISOString().slice(0, 10))
                                                }

                                            }}
                                            name="startdate"
                                            variant="standard"
                                            error={errors.startdate && touched.startdate}
                                            helperText={errors.startdate || 'Start Date'}
                                            value={values.startdate}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="expirydate"
                                            type="date"
                                            onChange={handleChange}
                                            name="expirydate"
                                            variant="standard"
                                            error={errors.expirydate && touched.expirydate}
                                            helperText={errors.expirydate || 'Expiry Date'}
                                            value={values.expirydate}
                                            sx={{ width: '100%' }}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="totalamount"
                                            type="number"
                                            onChange={handleChange}
                                            name="totalamount"
                                            label="Total Amount"
                                            variant="standard"
                                            error={errors.totalamount && touched.totalamount}
                                            helperText={errors.totalamount}
                                            value={values.totalamount}
                                            disabled
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
                                            error={errors.paidamount && touched.paidamount}
                                            helperText={errors.paidamount}
                                            onChange={e => {
                                                handleChange(e);

                                                const selectedMembership = membershipList.find(d => d.id === values.membershipid);

                                                if (e.target.value == selectedMembership?.amount) {
                                                    setFieldValue("status", true);
                                                }
                                            }}
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
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked={values.status} />}
                                            label="Paid"
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

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
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';

// Constants
import * as constants from '../../../Redux/constants/memberConstants';

// Validator
import validator from 'validator';
import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { updateMember, getMemberList } from '../../../Redux/actions/memberAction';

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
    width: '80%',
    height: '95%',
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



export default function UpdateMember(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { updateloading, updateerror, updatesuccess } = useSelector(state => state.updatemember);

    const Input = styled('input')({
        display: 'block',
    });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password should be contain letters and numbers.'),
        workouttype: Yup.string().required('Required'),
        trainerprofileid: Yup.string().required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Phone Should be 10 chars minimum.').max(12, 'To Long!').required('Required'),
        address: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!'),
        fromtime: Yup.string().required('From Time is Required'),
        totime: Yup.string().required('To Time is Required'),
        dob: Yup.date().required('Date of Birth is Required'),
        doj: Yup.date().required('Date of Join is Required'),
        height: Yup.number().positive('Invalid'),
        weight: Yup.number().positive('Invalid')
    });

    useEffect(() => {
        if (updatesuccess) {
            setOpen(false);
        }
    }, [updatesuccess]);

    // Fetch Trainer List

    const [trainerList, setTrainerList] = useState([]);

    const fetchData = async () => {

        const { data } = await axios.get(REACT_APP_BASE_URL + 'api/Trainer/GetActiveTrainerList');

        const filterData = data.map(function (obj) {
            obj['id'] = obj['_id'];
            delete obj['_id'];
            return obj;
        });

        setTrainerList(filterData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {updateerror && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={updateerror} severity="error" />}

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
                        initialValues={{ name: props.dataforupdate.name, email: props.dataforupdate.email, password: '', status: props.dataforupdate.status, gender: props.dataforupdate.gender, workouttype: props.dataforupdate.workouttype, fromtime: props.dataforupdate.workouttime.slice(0, 5), totime: props.dataforupdate.workouttime.slice(9, 15), phone: props.dataforupdate.phone, address: props.dataforupdate.address, problem: props.dataforupdate.problem, dob: props.dataforupdate.dob.slice(0, 10), doj: props.dataforupdate.doj.slice(0, 10), bloodgroup: props.dataforupdate.bloodgroup, height: props.dataforupdate.height, weight: props.dataforupdate.weight, trainerprofileid: props.dataforupdate.trainerprofileid }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            var formData = new FormData();

                            for (var key in values) {
                                if (values[key] !== '') {
                                    if (key === 'file')
                                        formData.append('image', values[key]);
                                    else
                                        formData.append(key, values[key]);
                                }
                            }

                            formData.append("workouttime", values['fromtime'] + ' To ' + values['totime']);

                            // Update
                            await dispatch({
                                type: constants.MEMBER_UPDATE_RESET
                            });

                            await dispatch(updateMember(props.dataforupdate.editid, formData));

                            // Reset
                            await dispatch({
                                type: constants.MEMBER_LIST_RESET
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
                                                    Update Member
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" color="error" onClick={handleClose} size='small'><ClearIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            name="name"
                                            label="Name"
                                            variant="standard"
                                            autoComplete='off'
                                            error={errors.name && touched.name}
                                            helperText={errors.name}
                                            sx={{ width: '100%' }} />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            name="email"
                                            label="Email"
                                            variant="standard"
                                            autoComplete='off'
                                            error={errors.email && touched.email}
                                            helperText={errors.email}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
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
                                    <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                                        
                                        {props.dataforupdate?.image?.image_url ? <Avatar src={props.dataforupdate.image.image_url} sx={{ width: 50, height: 50 }} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}><PersonIcon /></Avatar>}
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" name="image" type="file" onChange={(event) => {
                                                setFieldValue("file", event.currentTarget.files[0]);
                                            }} />
                                            {/* <Button variant="contained" component="span">
                                                Upload Image
                                            </Button> */}
                                        </label>
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

                                    <Grid item xs={12} md={4}>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="gender"
                                            defaultValue="male"
                                            onChange={handleChange}
                                            value={values.gender}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" Select />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="workouttype">Workout Type</InputLabel>
                                            <Select
                                                labelId="workouttype"
                                                id="demo-simple-select"
                                                name="workouttype"
                                                label="Workout Type"
                                                value={values.workouttype}
                                                onChange={handleChange}
                                                error={errors.workouttype && touched.workouttype}
                                                helperText={errors.workouttype}
                                                defaultValue=""
                                            >
                                                <MenuItem value="Weight Loss">Weight Loss</MenuItem>
                                                <MenuItem value="Weight Gain">Weight Gain</MenuItem>
                                                <MenuItem value="Both">Both</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="fromtime"
                                            type="time"
                                            onChange={handleChange}
                                            name="fromtime"
                                            value={values.fromtime}
                                            variant="standard"
                                            error={errors.fromtime && touched.fromtime}
                                            helperText={errors.fromtime || 'From Time'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="totime"
                                            type="time"
                                            onChange={handleChange}
                                            name="totime"
                                            value={values.totime}
                                            variant="standard"
                                            error={errors.totime && touched.totime}
                                            helperText={errors.totime || 'To Time'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="phone"
                                            onChange={handleChange}
                                            name="phone"
                                            value={values.phone}
                                            label="Phone"
                                            variant="standard"
                                            error={errors.phone && touched.phone}
                                            helperText={errors.phone}
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="dob"
                                            type="date"
                                            onChange={handleChange}
                                            name="dob"
                                            value={values.dob}
                                            variant="standard"
                                            error={errors.dob && touched.dob}
                                            helperText={errors.dob || 'Date of Birth'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="doj"
                                            type="date"
                                            onChange={handleChange}
                                            name="doj"
                                            value={values.doj}
                                            variant="standard"
                                            error={errors.doj && touched.doj}
                                            helperText={errors.doj || 'Date of Join'}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="height"
                                            type="number"
                                            onChange={handleChange}
                                            name="height"
                                            value={values.height}
                                            label="Height"
                                            variant="standard"
                                            error={errors.height && touched.height}
                                            helperText={errors.height}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="weight"
                                            type="number"
                                            onChange={handleChange}
                                            name="weight"
                                            value={values.weight}
                                            label="weight"
                                            variant="standard"
                                            error={errors.weight && touched.weight}
                                            helperText={errors.weight}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="trainerprofileid">Trainer</InputLabel>
                                            <Select
                                                labelId="trainerprofileid"
                                                id="demo-simple-select"
                                                name="trainerprofileid"
                                                label="Trainer"
                                                error={errors.trainerprofileid && touched.trainerprofileid}
                                                helperText={errors.trainerprofileid}
                                                onChange={handleChange}
                                                defaultValue=""
                                                value={values.trainerprofileid}
                                            >
                                                {trainerList.map((obj) => {
                                                    return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                                })}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="bloodgroup">Blood Group</InputLabel>
                                            <Select
                                                labelId="bloodgroup"
                                                id="demo-simple-select"
                                                name="bloodgroup"
                                                label="Blood Group"
                                                onChange={handleChange}
                                                defaultValue=""
                                                value={values.bloodgroup}
                                            >
                                                <MenuItem value="O-">O-</MenuItem>
                                                <MenuItem value="O+">O+</MenuItem>
                                                <MenuItem value="A-">A-</MenuItem>
                                                <MenuItem value="A+">A+</MenuItem>
                                                <MenuItem value="B-">B-</MenuItem>
                                                <MenuItem value="B+">B+</MenuItem>
                                                <MenuItem value="AB-">AB-</MenuItem>
                                                <MenuItem value="AB+">AB+</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="address"
                                            onChange={handleChange}
                                            name="address"
                                            value={values.address}
                                            label="Address"
                                            variant="standard"
                                            error={errors.address && touched.address}
                                            helperText={errors.address}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            id="problem"
                                            onChange={handleChange}
                                            name="problem"
                                            value={values.problem}
                                            label="Any Problem"
                                            variant="standard"
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={4}>

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button type="submit" variant="contained" color="info" startIcon={<CheckIcon />} disabled={isSubmitting} sx={{ width: '80%' }}>
                                            Update
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>

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

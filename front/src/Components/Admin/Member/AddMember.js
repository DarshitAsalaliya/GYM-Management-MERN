import * as React from 'react';
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

// Validator
import validator from 'validator';
import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { registerMember } from '../../../Redux/actions/memberAction';

// Snackbar
import SnackbarMsg from './SnackbarMsg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
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

export default function AddMember() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.member);

    const Input = styled('input')({
        display: 'none',
    });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password should be contain letters and numbers.'),
        workouttype: Yup.string().required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Phone Should be 10 chars minimum.').max(12, 'To Long!').required('Required'),
        address: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!'),
        fromtime: Yup.string().required('From Time is Required'),
        totime: Yup.string().required('To Time is Required'),
        dob: Yup.date().required('Date of Birth is Required'),
        doj: Yup.date().required('Date of Join is Required'),
        height: Yup.number().positive().required('Height is Required'),
        weight: Yup.number().positive().required('Weight is Required')
    });

    React.useEffect(() => {
        if (success) {
            setOpen(false);
        }
    }, [success]);

    return (
        <div>
            {error && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message={error} severity="error" />}
            <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>
                Add Member
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', status: true, gender: 'male', workouttype: '', fromtime: '', totime: '', phone: '', address: '', problem: '', dob: '', doj: '', bloodgroup: '', height: 0, weight: 0, trainerprofileid: '6267a51d9bcaf0d772cbbd43' }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            var formData = new FormData();

                            for (var key in values) {
                                if (key === 'file')
                                    formData.append('image', values[key]);
                                else
                                    formData.append(key, values[key]);
                            }

                            formData.append("workouttime", values['fromtime'] + ' To ' + values['totime']);

                            dispatch(registerMember(formData));

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
                                                <Typography variant="h5" gutterBottom component="div" >
                                                    Register Member 
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" variant="outlined" color="error" onClick={handleClose} size='small'><ClearIcon />
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
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" name="image" type="file" onChange={(event) => {
                                                setFieldValue("file", event.currentTarget.files[0]);
                                            }} />
                                            <Button variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                            label="Active"
                                            name="status"
                                            onChange={handleChange}
                                            value={values.status}
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
                                            label="weight"
                                            variant="standard"
                                            error={errors.weight && touched.weight}
                                            helperText={errors.weight}
                                            sx={{ width: '100%' }} />
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
                                            label="Any Problem"
                                            variant="standard"
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={4}>

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button type="submit" variant="contained" color="success" startIcon={<CheckIcon />} disabled={isSubmitting} sx={{ width: '80%' }}>
                                            Save
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

import React, { useEffect } from 'react';
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
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BoltIcon from '@mui/icons-material/Bolt';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';

// Constants
import * as constants from '../../../Redux/constants/supplementConstants';

import * as Yup from 'yup';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { updateSupplement } from '../../../Redux/actions/supplementAction';

// Snackbar
import SnackbarMsg from '../../Utils/SnackbarMsg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    height: '85%',
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

export default function UpdateSupplement(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { updateerror, updatesuccess } = useSelector(state => state.updatesupplement);

    const Input = styled('input')({
        display: 'block',
    });

    const ValidationSchema = Yup.object().shape({
        supplementname: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: Yup.number().positive('Invalid')
    });

    useEffect(() => {
        if (updatesuccess) {
            setOpen(false);
        }
    }, [updatesuccess]);

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
                        initialValues={{ supplementname: props.dataforupdate.supplementname, price: props.dataforupdate.price, description: props.dataforupdate.description, status: props.dataforupdate.status }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            var formData = new FormData();

                            for (var key in values) {
                                if (key === 'file')
                                    formData.append('image', values[key]);
                                else
                                    formData.append(key, values[key]);
                            }

                            // Update
                            await dispatch({
                                type: constants.SUPPLEMENT_UPDATE_RESET
                            });

                            await dispatch(updateSupplement(props.dataforupdate.editid, formData));

                            // Reset
                            await dispatch({
                                type: constants.SUPPLEMENT_LIST_RESET
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
                                                    Update Supplement
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" color="error" onClick={handleClose} size='small'><ClearIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} sx={{ textAlign: 'left' }}>
                                    {props.dataforupdate?.image?.image_url ? <Avatar src={props.dataforupdate.image.image_url} sx={{ width: 60, height: 60 }} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}><BoltIcon /></Avatar>}
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" name="image" type="file" onChange={(event) => {
                                                setFieldValue("file", event.currentTarget.files[0]);
                                            }} />
                                            {/* <Button variant="contained" component="span">
                                                Upload Image
                                            </Button> */}
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="supplementname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.supplementname}
                                            name="supplementname"
                                            label="Supplement Name"
                                            variant="standard"
                                            autoComplete='off'
                                            error={errors.supplementname && touched.supplementname}
                                            helperText={errors.supplementname}
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="price"
                                            type="number"
                                            onChange={handleChange}
                                            name="price"
                                            label="Amount"
                                            variant="standard"
                                            value={values.price}
                                            error={errors.price && touched.price}
                                            helperText={errors.price}
                                            sx={{ width: '100%' }} />
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="description"
                                            onChange={handleChange}
                                            name="description"
                                            label="Description"
                                            variant="standard"
                                            value={values.description}
                                            error={errors.description && touched.description}
                                            helperText={errors.description}
                                            sx={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
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

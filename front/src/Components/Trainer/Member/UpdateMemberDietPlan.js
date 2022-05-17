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
import TextareaAutosize from '@mui/material/TextareaAutosize';
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

    });

    useEffect(() => {
        if (updatesuccess) {
            setOpen(false);
        }
    }, [updatesuccess]);

    const dietplan = props.dataforupdate?.dietplan && JSON.parse(props.dataforupdate.dietplan);

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
                        initialValues={
                            {
                                sundaybreakfast: dietplan?.sundaybreakfast,
                                sundaylunch: dietplan?.sundaylunch,
                                sundaydinner: dietplan?.sundaydinner,
                                sundaysnacks: dietplan?.sundaysnacks,
                                mondaybreakfast: dietplan?.mondaybreakfast,
                                mondaylunch: dietplan?.mondaylunch,
                                mondaydinner: dietplan?.mondaydinner,
                                mondaysnacks: dietplan?.mondaysnacks,
                                tuesdaybreakfast: dietplan?.tuesdaybreakfast,
                                tuesdaylunch: dietplan?.tuesdaylunch,
                                tuesdaydinner: dietplan?.tuesdaydinner,
                                tuesdaysnacks: dietplan?.tuesdaysnacks,
                                wednesdaybreakfast: dietplan?.wednesdaybreakfast,
                                wednesdaylunch: dietplan?.wednesdaylunch,
                                wednesdaydinner: dietplan?.wednesdaydinner,
                                wednesdaysnacks: dietplan?.wednesdaysnacks,
                                thursdaybreakfast: dietplan?.thursdaybreakfast,
                                thursdaylunch: dietplan?.thursdaylunch,
                                thursdaydinner: dietplan?.thursdaydinner,
                                thursdaysnacks: dietplan?.thursdaysnacks,
                                fridaybreakfast: dietplan?.fridaybreakfast,
                                fridaylunch: dietplan?.fridaylunch,
                                fridaydinner: dietplan?.fridaydinner,
                                fridaysnacks: dietplan?.fridaysnacks,
                                saturdaybreakfast: dietplan?.saturdaybreakfast,
                                saturdaylunch: dietplan?.saturdaylunch,
                                saturdaydinner: dietplan?.saturdaydinner,
                                saturdaysnacks: dietplan?.saturdaysnacks,
                            }
                        }
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            var formData = new FormData();

                            for (var key in values) {
                                if (values[key] === null || values[key] === undefined || values[key] === '') {
                                    delete values[key];
                                }
                            }

                            formData.append('dietplan', JSON.stringify(values));

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

                                <Grid container spacing={1.5} sx={{ textAlign: 'center' }}>
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={3} >
                                            <Grid item xs={10} md={8} sx={{ textAlign: 'left' }}>
                                                <Typography variant="h6" gutterBottom component="div" >
                                                    Diet Plan
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} md={4} sx={{ textAlign: 'right' }}>
                                                <Button type="submit" color="error" onClick={handleClose} size='small'><ClearIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Sunday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="sundaybreakfast"
                                            defaultValue={values.sundaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="sundaylunch"
                                            value={values.sundaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="sundaydinner"
                                            value={values.sundaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="sundaysnacks"
                                            value={values.sundaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Monday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="mondaybreakfast"
                                            value={values.mondaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="mondaylunch"
                                            value={values.mondaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="mondaydinner"
                                            value={values.mondaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="mondaysnacks"
                                            value={values.mondaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Tuesday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="tuesdaybreakfast"
                                            value={values.tuesdaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="tuesdaylunch"
                                            value={values.tuesdaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="tuesdaydinner"
                                            value={values.tuesdaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="tuesdaysnacks"
                                            value={values.tuesdaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Wednesday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="wednesdaybreakfast"
                                            value={values.wednesdaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="wednesdaylunch"
                                            value={values.wednesdaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="wednesdaydinner"
                                            value={values.wednesdaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="wednesdaysnacks"
                                            value={values.wednesdaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Thursday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="thursdaybreakfast"
                                            value={values.thursdaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="thursdaylunch"
                                            value={values.thursdaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="thursdaydinner"
                                            value={values.thursdaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="thursdaysnacks"
                                            value={values.thursdaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Friday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="fridaybreakfast"
                                            value={values.fridaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="fridaylunch"
                                            value={values.fridaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="fridaydinner"
                                            value={values.fridaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="fridaysnacks"
                                            value={values.fridaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Typography component="div" sx={{ textAlign: 'left' }}>
                                            Saturday
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Break Fast"
                                            name="saturdaybreakfast"
                                            value={values.saturdaybreakfast}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Lunch"
                                            name="saturdaylunch"
                                            value={values.saturdaylunch}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Dinner"
                                            name="saturdaydinner"
                                            value={values.saturdaydinner}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2.5}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={2}
                                            placeholder="Snacks"
                                            name="saturdaysnacks"
                                            value={values.saturdaysnacks}
                                            onChange={handleChange}
                                            style={{ width: '100%',padding: '5px',border:'none',borderBottom:'1px solid gray',color:'#464646' }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button type="submit" variant="contained" color="info" startIcon={<CheckIcon />} disabled={isSubmitting} sx={{ width: '80%' }}>
                                            Update Diet Plan
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

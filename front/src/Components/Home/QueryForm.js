import { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../Redux/constants/leadConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { createLead } from '../../Redux/actions/leadAction';

// Snackbar
import SnackbarMsg from '../Utils/SnackbarMsg';

import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function QueryForm() {

    const dispatch = useDispatch();

    const { registerloading, registererror, registersuccess } = useSelector(state => state.createlead);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    // Validation
    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        query: Yup.string()
            .min(3, 'Too Short!')
            .max(60, 'Too Long!')
            .required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Phone Should be 10 chars minimum.').max(10, 'To Long!').required('Required'),
    });

    useEffect(() => {
        dispatch({
            type: constants.NEW_LEAD_RESET
        });
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} mt={1} p={2}>

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" sx={{ color: '#474747', textAlign: 'center' }}>
                        Query Form
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={4} sx={{ opacity: 0.9, display: { md: 'block', xs: 'none' } }}>
                    <img src="https://leesexoticbirds.com/wp-content/uploads/2021/01/enquiry-now.png" width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} md={4}>

                    {registersuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Your Query Submitted.. We Will Contact Very Soon.." severity="success" />}

                    <Formik
                        initialValues={{ name: '', query: '', phone: '' }}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            // Reset
                            await dispatch({
                                type: constants.NEW_LEAD_RESET
                            });

                            await dispatch(createLead(values));

                            setSubmitting(false);

                            // Clear
                            values.name = '';
                            values.query = '';
                            values.phone = '';
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
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
                                <br /><br />
                                <TextField
                                    id="Query"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.query}
                                    name="query"
                                    label="Query"
                                    variant="standard"
                                    autoComplete='off'
                                    error={errors.query && touched.query}
                                    helperText={errors.query}
                                    sx={{ width: '100%' }} />
                                <br /><br />
                                <TextField
                                    id="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="phone"
                                    label="Phone"
                                    variant="standard"
                                    autoComplete='off'
                                    error={errors.phone && touched.phone}
                                    helperText={errors.phone}
                                    value={values.phone}
                                    sx={{ width: '100%' }} />
                                <br /><br />
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{ width: '100%' }}>
                                    Submit
                                </Button>
                            </form>
                        )}
                    </Formik>

                </Grid>
                <Grid item xs={12} md={4}>

                </Grid>
            </Grid>

        </Box>
    );
}


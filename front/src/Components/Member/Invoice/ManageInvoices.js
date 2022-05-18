import React, { useEffect } from 'react';
import InvoiceList from './InvoiceList';
import SnackbarMsg from '../../Utils/SnackbarMsg';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

// Style
import '../../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../../Redux/constants/invoiceConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

export default function ManageInvoices() {

    const dispatch = useDispatch();
    const { createinvoicesuccess } = useSelector(state => state.createinvoice);
    const { updateinvoicesuccess } = useSelector(state => state.updateinvoice);
    const { deleteinvoicesuccess } = useSelector(state => state.deleteinvoice);

    useEffect(() => {
        dispatch({
            type: constants.NEW_INVOICE_RESET
        });

        dispatch({
            type: constants.INVOICE_UPDATE_RESET
        });

        dispatch({
            type: constants.INVOICE_DELETE_RESET
        });

        dispatch({
            type: constants.INVOICE_LIST_RESET
        });
    }, [dispatch]);

    const navigate = useNavigate();

    const navigateToMemberList = () => {
        navigate("../ManageMembers", { replace: true });
    };

    return (
        <>
            {createinvoicesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Added Successfully.." severity="success" />}
            {updateinvoicesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Updated Successfully.." severity="info" />}
            {deleteinvoicesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Deleted Successfully.." severity="error" />}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Typography variant="h6" component="div" className='moduleHeading'>
                            Your Invoice
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ textAlign: 'right' }}>
                     
                    </Grid>
                </Grid>
            </Box>


            <InvoiceList />
        </>
    );
}

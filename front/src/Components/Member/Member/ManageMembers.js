import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import MemberList from './MemberList';
import MemberDietPlan from './MemberDietPlan';
import SnackbarMsg from '../../Utils/SnackbarMsg';
import Typography from '@mui/material/Typography';

// Style
import '../../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../../Redux/constants/memberConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { registerMember, getMemberList } from '../../../Redux/actions/memberAction';

export default function ManageMembers() {

    const dispatch = useDispatch();
    const { registerloading, registererror, registersuccess } = useSelector(state => state.registermember);
    const { createinvoiceloading, createinvoiceerror, createinvoicesuccess } = useSelector(state => state.createinvoice);
    const { updateloading, updateerror, updatesuccess } = useSelector(state => state.updatemember);
    const { deleteloading, deleteerror, deletesuccess } = useSelector(state => state.deletemember);

    useEffect(() => {
        dispatch({
            type: constants.NEW_MEMBER_RESET
        });

        dispatch({
            type: constants.MEMBER_UPDATE_RESET
        });

        dispatch({
            type: constants.MEMBER_DELETE_RESET
        });
    }, [dispatch]);

    return (
        <>
            {registersuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Added Successfully.." severity="success" />}
            {createinvoicesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Invoice Created Successfully.." severity="success" />}
            {updatesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Updated Successfully.." severity="info" />}
            {deletesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Deleted Successfully.." severity="error" />}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" component="div" className='moduleHeading'>
                            Your Diet Plan
                        </Typography>
                    </Grid>
                    <Grid item xs={0} md={4} sx={{ textAlign: 'right' }}>
                    </Grid>
                </Grid>
            </Box>
            <MemberDietPlan />
        </>
    );
}

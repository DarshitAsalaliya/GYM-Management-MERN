import React, { useEffect } from 'react';
import AddMembership from './AddMembership';
import MembershipList from './MembershipList';
import SnackbarMsg from '../../Utils/SnackbarMsg';
import Typography from '@mui/material/Typography';
// Style
import '../../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../../Redux/constants/membershipConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

export default function ManageMemberships() {

    const dispatch = useDispatch();
    const { registersuccess } = useSelector(state => state.createmembership);
    const { updatesuccess } = useSelector(state => state.updatemembership);
    const { deletesuccess } = useSelector(state => state.deletemembership);

    useEffect(() => {
        dispatch({
            type: constants.NEW_MEMBERSHIP_RESET
        });

        dispatch({
            type: constants.MEMBERSHIP_UPDATE_RESET
        });

        dispatch({
            type: constants.MEMBERSHIP_DELETE_RESET
        });
    }, [dispatch]);

    return (
        <>
            {registersuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Added Successfully.." severity="success" />}
            {updatesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Updated Successfully.." severity="info" />}
            {deletesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Deleted Successfully.." severity="error" />}

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Typography variant="h6" component="div" className='moduleHeading'>
                            Manage Membership
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ textAlign: 'right' }}>
                        <AddMembership />
                    </Grid>
                </Grid>
            </Box>


            <MembershipList />
        </>
    );
}

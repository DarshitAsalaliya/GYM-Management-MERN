import React, { useEffect } from 'react';
import AddTrainer from './AddTrainer';
import TrainerList from './TrainerList';
import SnackbarMsg from '../../Utils/SnackbarMsg';
import Typography from '@mui/material/Typography';
// Style
import '../../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../../Redux/constants/trainerConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { registerTrainer, getTrainerList } from '../../../Redux/actions/trainerAction';

export default function ManageTrainers() {

    const dispatch = useDispatch();
    const { registerloading, registererror, registersuccess } = useSelector(state => state.registertrainer);
    const { updateloading, updateerror, updatesuccess } = useSelector(state => state.updatetrainer);
    const { deleteloading, deleteerror, deletesuccess } = useSelector(state => state.deletetrainer);

    // Reset
    useEffect(() => {
        dispatch({
            type: constants.NEW_TRAINER_RESET
        });

        dispatch({
            type: constants.TRAINER_UPDATE_RESET
        });

        dispatch({
            type: constants.TRAINER_DELETE_RESET
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
                            Manage Trainer
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ textAlign: 'right' }}>
                        <AddTrainer />
                    </Grid>
                </Grid>
            </Box>


            <TrainerList />
        </>
    );
}

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

// Snackbar
import SnackbarMsg from '../../Utils/SnackbarMsg';

// Constants
import * as constants from '../../../Redux/constants/trainerConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { deleteTrainer, getTrainerList } from '../../../Redux/actions/trainerAction';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

export default function DeleteTrainer(props) {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    // Delete Function
    const handleDelete = async () => {

        // Delete Reset
        await dispatch({
            type: constants.TRAINER_DELETE_RESET
        });

        await dispatch(deleteTrainer(props.id));

        // List Reset
        await dispatch({
            type: constants.TRAINER_LIST_RESET
        });

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button variant="outlined" color='error' onClick={handleClickOpen}>
                <DeleteIcon fontSize="small" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

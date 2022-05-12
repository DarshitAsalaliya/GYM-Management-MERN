import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

// Constants
import * as constants from '../../../Redux/constants/leadConstants';

// Redux
import { useDispatch } from 'react-redux';

// Action
import { updateLead } from '../../../Redux/actions/leadAction';

export default function DeleteLead(props) {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = async () => {

        // Delete Reset
        await dispatch({
            type: constants.LEAD_UPDATE_RESET
        });

        await dispatch(updateLead(props.id, { status: props?.currentstatus === 'Pending' ? 'Completed' : 'Pending' }));

        // List Reset
        await dispatch({
            type: constants.LEAD_LIST_RESET
        });

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {props?.currentstatus === 'Pending' ?
                <Button variant="outlined" color='error' onClick={handleClickOpen} size='small'>
                    {props?.currentstatus}
                </Button>
                :
                <Button variant="outlined" color='success' onClick={handleClickOpen} size='small'>
                    {props?.currentstatus}
                </Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to change status?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChange} autoFocus>
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

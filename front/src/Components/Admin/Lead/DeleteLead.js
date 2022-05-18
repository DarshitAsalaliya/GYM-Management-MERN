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
import { deleteLead } from '../../../Redux/actions/leadAction';

export default function DeleteLead(props) {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    // Delete Function
    const handleDelete = async () => {

        // Delete Reset
        await dispatch({
            type: constants.LEAD_DELETE_RESET
        });

        await dispatch(deleteLead(props.id));

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

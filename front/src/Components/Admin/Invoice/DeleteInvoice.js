import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

// Constants
import * as constants from '../../../Redux/constants/invoiceConstants';

// Redux
import { useDispatch } from 'react-redux';

// Action
import { deleteInvoice } from '../../../Redux/actions/invoiceAction';

export default function DeleteInvoice(props) {

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    // Delete Function
    const handleDelete = async () => {
        setLoader(true);
        // Delete Reset
        await dispatch({
            type: constants.INVOICE_DELETE_RESET
        });

        await dispatch(deleteInvoice(props.id));

        // List Reset
        await dispatch({
            type: constants.INVOICE_LIST_RESET
        });

        setLoader(false);
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
                    <Button onClick={handleDelete} autoFocus disabled={loader}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

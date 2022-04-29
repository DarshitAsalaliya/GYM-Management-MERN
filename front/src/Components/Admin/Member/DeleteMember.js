import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

// Snackbar
import SnackbarMsg from './SnackbarMsg';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { deleteMember, getMemberList } from '../../../Redux/actions/memberAction';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

export default function DeleteMember(props) {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async() => {
        await dispatch(deleteMember(props.id));
        await dispatch(getMemberList());
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

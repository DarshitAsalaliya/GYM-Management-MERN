import React, { useEffect, useState,memo } from 'react';
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
import * as constants from '../../../Redux/constants/memberConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { deleteMember, getMemberList } from '../../../Redux/actions/memberAction';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

export default memo(function DeleteMember(props) {

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
            type: constants.MEMBER_DELETE_RESET
        });

        await dispatch(deleteMember(props.id));

        // List Reset
        await dispatch({
            type: constants.MEMBER_LIST_RESET
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
});

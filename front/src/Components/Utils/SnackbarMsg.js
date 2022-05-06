import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarMsg(props) {
    const [msg, setMsg] = React.useState({
        open: props.open,
        vertical: props.vertical,
        horizontal: props.horizontal,
        message: props.message,
        severity:props.severity
    });

    const { vertical, horizontal, open } = msg;

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setMsg({
            ...msg,
            open: false,
        });
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={msg.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={msg.vertical + msg.horizontal}>
                <Alert onClose={handleClose} severity={msg.severity} sx={{ width: '100%' }}>
                    {msg.message}
                </Alert>
            </Snackbar>

        </Stack>
    );
}

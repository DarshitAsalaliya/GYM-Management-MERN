import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

// Grid
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../../Redux/constants/notificationConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getNotificationList } from '../../../Redux/actions/notificationAction';

import NotificationCard from './NotificationCard';

export default function NotificationList(props) {

    const [notificationList, setNotificationList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getnotificationlist);

    useEffect(() => {

        loadNotificationList();

    }, [getlistsuccess]);

    useEffect(() => {

        dispatch({ type: constants.NOTIFICATION_LIST_RESET });

    }, []);

    const loadNotificationList = async () => {

        await dispatch(getNotificationList());

        data && setNotificationList(data);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Typography variant="h6" component="div" className='moduleHeading'>
                            Notification
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ textAlign: 'right' }}>
                    </Grid>
                </Grid>
            </Box>
            {
                notificationList.map((obj, i) => <NotificationCard data={obj} key={i} />)
            }
        </>
    );
}

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
                    <Grid item xs={12} md={5} sx={{ height: 450, overflowY: 'scroll' }}>
                        {
                            notificationList.map((obj, i) => <NotificationCard data={obj} key={i} />)
                        }

                        {notificationList.length === 0 && 'No any update!!'}
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ textAlign: 'center', opacity: 0.9, display: { xs: 'none', md: 'block' } }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/004/968/527/non_2x/enable-reminder-notification-permission-pop-up-button-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" alt="Query" width="60%" height="auto" />
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}

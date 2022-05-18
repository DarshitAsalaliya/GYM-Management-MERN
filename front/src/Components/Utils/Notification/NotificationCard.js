import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

export default function NotificationCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card sx={{ maxWidth: 350, border: '1px solid #e9e6e6', textAlign: 'center' }} elevation={0} key={props?.data?._id} >
            <CardHeader

                avatar={
                    <Avatar sx={{ bgcolor: '#4885ED' }} aria-label="recipe">
                        {props?.data?.notificationcontent.includes('joined') ? <PersonAddAlt1Icon /> : <PersonRemoveAlt1Icon />}
                    </Avatar>
                }

                title={props?.data?.notificationcontent}
                subheader={new Date(props?.data?.createdAt).toUTCString()}
            />
        </Card>
    );
}

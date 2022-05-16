import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

export default function NotificationCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

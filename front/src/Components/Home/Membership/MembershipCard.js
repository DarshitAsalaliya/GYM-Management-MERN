import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

import '../../Utils/GlobalStyle.css';

export default function MembershipCard(props) {
    return (
        <Card sx={{
            maxWidth: 345, border: '1px solid #e9e6e6', '&:hover': {boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'},
        }} elevation={0} >

            <CardMedia
                component="img"
                height="200"

                image={props.data?.image?.image_url || 'https://static.vecteezy.com/system/resources/previews/005/911/683/non_2x/premium-member-icon-premium-account-premium-user-free-vector.jpg'}
            />
            <CardContent>
                <Tooltip title={props.data?.membershipname}>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: '#464646', height: 30 }}>
                        {props.data?.membershipname.length <= 20 ? props.data?.membershipname.slice(0, 20) : props.data?.membershipname.slice(0, 20) + '..'}
                    </Typography>
                </Tooltip>
                <Typography gutterBottom variant="subtitle" component="div" sx={{ color: '#474747' }}>
                    {props.data?.amount} ₹
                </Typography>
                <Tooltip title={props.data?.description}>
                    <Typography variant="body2" color="text.secondary" sx={{ height: 45 }}>
                        {props.data?.description.length <= 50 ? props.data?.description.slice(0, 50) : props.data?.description.slice(0, 50) + '..'}
                    </Typography>
                </Tooltip>
                <br />
                <Link href={`https://wa.me/9856325698/?text=I want to purchase ${props.data?.membershipname}`} underline="none" target="_blank">
                    <Button variant="outlined" endIcon={<WhatsAppIcon />} size="small" fullWidth>
                        Purchase
                    </Button>
                </Link>
            </CardContent>

        </Card>
    );
}

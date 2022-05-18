import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

export default function SupplementCard(props) {
  return (
    <Card sx={{ maxWidth: 345, border: '1px solid #e9e6e6' }} elevation={0}>

      <CardMedia
        component="img"
        height="200"
        image={props.data?.image?.image_url || 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}
      />
      <CardContent>
        <Tooltip title={props.data?.supplementname}>
          <Typography gutterBottom variant="body2" component="div" sx={{ color: '#464646', height: 45 }}>
            {props.data?.supplementname.length <= 20 ? props.data?.supplementname.slice(0, 20) : props.data?.supplementname.slice(0, 20) + '..'}
          </Typography>
        </Tooltip>
        <Typography gutterBottom variant="button" component="div" sx={{ color: '#474747' }}>
          {props.data?.price} ₹
        </Typography>
        <Tooltip title={props.data?.description}>
          <Typography variant="body2" color="text.secondary" sx={{height: 45}}>
            {props.data?.description.length <= 50 ? props.data?.description.slice(0, 50) : props.data?.description.slice(0, 50) + '..'}
          </Typography>
        </Tooltip>
        <br />
        <Link href={`https://wa.me/9856325698/?text=I want to purchase ${props.data?.supplementname}`} underline="none" target="_blank">
          <Button variant="outlined" endIcon={<WhatsAppIcon />} size="small" fullWidth>
            Order
          </Button>
        </Link>
      </CardContent>

    </Card>
  );
}

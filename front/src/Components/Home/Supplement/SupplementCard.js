import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SupplementCard(props) {
  return (
    <Card sx={{ maxWidth: 345,border: '1px solid #e9e6e6' }} elevation={0}>

      <CardMedia
        component="img"
        height="150"
        image={props.data?.image?.image_url || 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div" sx={{color:'#474747'}}>
          {props.data?.supplementname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data?.description}
        </Typography>
      </CardContent>

    </Card>
  );
}

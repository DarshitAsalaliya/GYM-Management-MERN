import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// Grid
import Grid from '@mui/material/Grid';

export default function StandardImageList() {
    return (

        <Grid container spacing={1} sx={{ color: '#464646' }}>

            {itemData.map((item, i) => (
                <Grid xs={6} md={2} p={0.5} key={i} sx={{ textAlign: 'center', '&:hover': { opacity: 0.8 } }}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        width="100%"
                    />
                </Grid>
            ))}

        </Grid>

    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1547919307-1ecb10702e6f',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1616279967983-ec413476e824',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1608138278545-366680accc66',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1483721310020-03333e577078',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1632758243488-7e6f9173cfa1',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1623874106686-5be2b325c8f1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1561214078-f3247647fc5e',
        title: 'Bike',
    },
];

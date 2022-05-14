import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';

// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme({
    typography: {
        fontFamily: 'unset',
    },
});

export default function Footer() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2} sx={{ backgroundColor: '#363636', color: '#efefef', }} mt={0} p={2}>
                    <Grid item xs={12} md={4}>

                        <Typography variant="body1" component="h2">
                            Our Story
                        </Typography>
                        <Divider color='#ffffff' /><br />
                        <Typography variant="body2">
                            Gym and Fitness was founded in 2002 as a family owned and operated business specialising in supplying high-quality gym equipment at great prices.
                        </Typography><br />
                        <Typography variant="body2">
                            Instead of being just another gym equipment retailer, our founders wanted to be the best in the industry and set their minds to doing so! Over the last two decades Gym and Fitness has grown into one of Australia’s largest online fitness equipment retailers, helping thousands of customers live longer, happier and healthier lives.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" component="h2">
                            Address & Contact
                        </Typography>
                        <Divider color='#ffffff' /><br />
                        <Typography variant="body2">
                            77/78, S.P.Road, Silver Jubilee Park Rd, Kalasipalam New Exte
                        </Typography>
                        <Typography variant="body2">
                            City/Town :	Surat
                        </Typography>
                        <Typography variant="body2">
                            State :	Gujarat
                        </Typography>
                        <Typography variant="body2">
                            Phone Number : +91 8698563254
                        </Typography>
                        <Typography variant="body2">
                            Email : fitness@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="body1" component="h2">
                            Useful Links
                        </Typography>
                        <Divider color='#ffffff' /><br />
                        <Typography variant="body2">
                            Supplements
                        </Typography>
                        <Typography variant="body2">
                            Brands
                        </Typography>
                        <Typography variant="body2">
                            Blogs
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography variant="body1" component="h2">
                            Social Media
                        </Typography>
                        <Divider color='#ffffff' /><br />
                        <Typography variant="body2" >
                            <InstagramIcon /> <FacebookIcon /> <YouTubeIcon /> <PinterestIcon />
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Typography variant="body2" component="h2" sx={{ textAlign: 'center', fontFamily: 'unset' }}>
                            TERMS OF USE © 2022 | www.fitness.com | ALL RIGHTS RESERVED
                        </Typography>
                    </Grid>

                </Grid>
            </ThemeProvider>
        </>
    );
}

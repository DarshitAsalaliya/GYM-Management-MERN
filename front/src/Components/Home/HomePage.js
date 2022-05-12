import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SupplementList from './Supplement/SupplementList';
// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'unset',
    },
});

export default function HomePage() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2} sx={{ color: '#464646' }}>
                    <Grid xs={12} p={6} pb={0}>
                        <Typography variant="h3" component="h2" sx={{ textAlign: 'center' }}>
                            WE ARE GYM AND FITNESS
                        </Typography>
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
                            Helping people live longer, happier and healthier lives for over 20 years.
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={7} pt={15} pl={5}>
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
                            OUR PEOPLE
                        </Typography>
                        <Divider />
                        <Typography variant="body1" component="h2" sx={{ textAlign: 'center' }} mt={3}>
                            Gym and Fitness has a growing team of 60+ awesome superstars and we owe our success to each and every one of them!
                            <br /> <br />
                            We have some pretty amazing people working with us, who hustle everyday to give you the best possible experience! You can find them in areas such as sales, marketing and e-commerce, customer service, warehousing, finance, human resources and management.
                            <br /> <br />
                            If you're looking for an opportunity to grow at a company that's empowered, inclusive, and values great work—you should work with us.
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={5}>
                        <img src='https://png.pngtree.com/png-vector/20190903/ourlarge/pngtree-set-of-gym-workout-people-png-image_1718229.jpg' width='100%' />
                    </Grid>

                    <Grid xs={12} p={6} pt={0}>
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
                            OUR VALUES
                        </Typography>
                        <Divider />
                        <Typography variant="body1" component="h2" sx={{ textAlign: 'center' }} mt={2}>
                            For 20 years helping customers reach their fitness goals has been at the heart of what we do and why we do it! We live and breathe our six core values and four brand promises  — which speak of our commitment to our customers, staff, the industry and our business as a
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={5}>
                        <img src='https://img.freepik.com/free-vector/young-people-standing-talking-each-other-speech-bubble-smartphone-girl-flat-vector-illustration-communication-discussion_74855-8741.jpg?w=740&t=st=1652344411~exp=1652345011~hmac=2d983cce200cb1bff491db2456d2f480df442536630abb9c600350f0d39ce218' width='100%' />
                    </Grid>

                    <Grid xs={12} md={7} pt={5} pl={5}>
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
                            OUR CULTURE
                        </Typography>
                        <Divider />
                        <Typography variant="body1" component="h2" sx={{ textAlign: 'center' }} mt={3}>
                            We know that building a positive culture is incredibly important. We believe in encouraging, supporting, challenging, learning and growing to be the best! Our flexible working solutions, gym rebates and educational opportunities create a positive work/life balance for all our employees.
                            <br /> <br />
                            We believe in giving back and offering time, money and products to volunteer services and community organisations. We’re committed to improving individuals' health, fitness, and well-being by supporting global and local charities, local sports teams, and events.
                        </Typography>
                    </Grid>



                </Grid>
            </ThemeProvider>
        </>
    );
}
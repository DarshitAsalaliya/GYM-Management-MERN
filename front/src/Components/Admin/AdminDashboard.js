import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {
  return (

    <>

      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Typography variant="h6" gutterBottom component="div" className='moduleHeading'>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} sx={{ textAlign: 'right' }}>

          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={3} >
            <Item elevation={0} sx={{ backgroundColor: '#FFF1D7' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                0
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#FFEEE7' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Trainers
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                0
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#F1FCEB' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Memberships
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                0
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#FFF1D7' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Supplements
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                0
              </Typography>

            </Item>
          </Grid>
        </Grid>
      </Box>

    </>
  );
}

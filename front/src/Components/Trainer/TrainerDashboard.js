import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getAdminDashboardData } from '../../Redux/actions/dashboardAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {

  const [dashboardData, setDashboardData] = useState([]);

  const dispatch = useDispatch();

  const { admindashboarddata, getadmindashboarddatasuccess } = useSelector(state => state.admindashboarddata);

  useEffect(() => {
    dispatch(getAdminDashboardData());
  }, [dispatch])

  useEffect(() => {
    admindashboarddata && setDashboardData(admindashboarddata);
  }, [admindashboarddata])

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
            <Item elevation={0} sx={{ backgroundColor: '#D1E9FC' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData.totalMembers || 0}
              </Typography>
              
            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#D0F2FF' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Trainers
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData.totalTrainers || 0}
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#FFF7CD' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Memberships
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData.totalMemberships || 0}
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#FFE7D9' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Supplements
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData.totalSupplements || 0}
              </Typography>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#FFF7CD' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Invoices
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData.totalInvoices || 0}
              </Typography>

            </Item>
          </Grid>
        </Grid>
      </Box>

    </>
  );
}
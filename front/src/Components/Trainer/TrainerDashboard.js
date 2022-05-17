import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getTrainerDashboardData } from '../../Redux/actions/dashboardAction';

//Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const { trainerdashboarddata, gettrainerdashboarddatasuccess } = useSelector(state => state.trainerdashboarddata);

  useEffect(() => {
    dispatch(getTrainerDashboardData());
  }, [dispatch])

  useEffect(() => {
    trainerdashboarddata && setDashboardData(trainerdashboarddata);
  }, [trainerdashboarddata])

  const memberactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => d.status === true).length, dashboardData.totalMembers?.filter(d => d.status === false).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const membergenderchartdata = {
    labels: ['Male    ', 'Female'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => d.gender === 'male').length, dashboardData.totalMembers?.filter(d => d.gender === 'female').length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const membermembershipstatusdata = {
    labels: ['Valid Membership    ', 'Expired Membership'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => new Date(d?.invoices[d?.invoices?.length - 1]?.expirydate.slice(0, 10)) >= new Date(new Date().toISOString().slice(0, 10)) && d?.invoices?.length > 0 && d?.status === true).length, dashboardData.totalMembers?.filter(d => new Date(d?.invoices[d?.invoices?.length - 1]?.expirydate.slice(0, 10)) < new Date(new Date().toISOString().slice(0, 10)) && d?.invoices?.length > 0 && d?.status === true).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const memberdietplanstatuschartdata = {
    labels: ['Diet Plan Set       ', 'Diet Plan Not Set'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => d.dietplan!=='{}' && d.dietplan!==undefined).length, dashboardData.totalMembers?.filter(d => d.dietplan===undefined || d.dietplan === '{}').length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
          <Grid item xs={12} md={12} >
            <Item elevation={0} sx={{ backgroundColor: '' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Assigned Members
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalMembers?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Doughnut data={membermembershipstatusdata} />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Doughnut data={memberactiveinactivechartdata} />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Doughnut data={membergenderchartdata} />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Doughnut data={memberdietplanstatuschartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>




          {/* <Grid item xs={6} md={3}>
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
          </Grid> */}
        </Grid>
      </Box>

    </>
  );
}

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getAdminDashboardData } from '../../Redux/actions/dashboardAction';

//Chart
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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

  const memberactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => d.status === true).length, dashboardData.totalMembers?.filter(d => d.status === false).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
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
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const traineractiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalTrainers?.filter(d => d.status === true).length, dashboardData.totalTrainers?.filter(d => d.status === false).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const membershipactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMemberships?.filter(d => d.status === true).length, dashboardData.totalMemberships?.filter(d => d.status === false).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const supplementactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalSupplements?.filter(d => d.status === true).length, dashboardData.totalSupplements?.filter(d => d.status === false).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const invoicechartpaidstatusdata = {
    labels: ['Paid    ', 'Unpaid'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalInvoices?.filter(d => d.totalamount === d.paidamount).length, dashboardData.totalInvoices?.filter(d => d.totalamount > d.paidamount).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
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
        data: [dashboardData.totalMembers?.filter(d => new Date(d?.invoices[d?.invoices?.length - 1]?.expirydate).toLocaleDateString() >= new Date().toLocaleDateString() && d?.invoices?.length > 0 && d?.status === true).length, dashboardData.totalMembers?.filter(d => new Date(d?.invoices[d?.invoices?.length - 1]?.expirydate).toLocaleDateString() < new Date().toLocaleDateString() && d?.invoices?.length > 0 && d?.status === true).length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
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
        data: [dashboardData.totalMembers?.filter(d => d.dietplan !== '{}').length, dashboardData.totalMembers?.filter(d => d.dietplan === '{}').length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const female10 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 10 && d.gender === 'female').length;
  const male10 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 10 && d.gender === 'male').length;

  const female1020 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 10 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 20 && d.gender === 'female').length;
  const male1020 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 10 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 20 && d.gender === 'male').length;

  const female2030 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 20 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 30 && d.gender === 'female').length;
  const male2030 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 20 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 30 && d.gender === 'male').length;

  const female3040 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 30 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 40 && d.gender === 'female').length;
  const male3040 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 30 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 40 && d.gender === 'male').length;

  const female4050 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 40 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 50 && d.gender === 'female').length;
  const male4050 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 40 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) <= 50 && d.gender === 'male').length;

  const female5060 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 50 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) < 60 && d.gender === 'female').length;
  const male5060 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) > 50 && (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) < 60 && d.gender === 'male').length;

  const female60 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) >= 60 && d.gender === 'female').length;
  const male60 = dashboardData?.totalMembers?.filter(d => (new Date().getFullYear() - parseInt(d.dob.slice(0, 4))) >= 60 && d.gender === 'male').length;

  const agewisechartdata = {
    labels: ['<= 10', '10-20', '20-30', '30-40', '40-50', '50-60', '>= 60'],
    datasets: [
      {
        label: 'Male',
        data: [male10, male1020, male2030, male3040, male4050, male5060, male60, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Female',
        data: [female10, female1020, female2030, female3040, female4050, female5060, female60, 10],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const leadchartdata = {
    labels: ['Completed  ', 'Pending      '],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalLeads?.filter(d => d.status === 'Completed').length, dashboardData.totalLeads?.filter(d => d.status === 'Pending').length],
        backgroundColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 99, 132, 0.4)',
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
            <Item elevation={0} sx={{ backgroundColor: '#f1f8ff' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Total Members
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalMembers?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Doughnut data={membermembershipstatusdata} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Doughnut data={memberactiveinactivechartdata} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Doughnut data={membergenderchartdata} />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Doughnut data={memberdietplanstatuschartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>

          <Grid item xs={6} md={3} >
            <Item elevation={0} sx={{ backgroundColor: '#fff9dd' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Total Invoices
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalInvoices?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Doughnut data={invoicechartpaidstatusdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>

          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#ecffeb' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Total Trainers
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalTrainers?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Doughnut data={traineractiveinactivechartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#fff0e7' }}>

              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Supplements
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalSupplements?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Doughnut data={supplementactiveinactivechartdata} />
                </Grid>
              </Grid>

            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#e9fdff' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Memberships
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalMemberships?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Doughnut data={membershipactiveinactivechartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item elevation={0} sx={{ backgroundColor: '#e9fdff' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h6" display="block" gutterBottom>
                    Age Analysis
                  </Typography>
                  <Bar data={agewisechartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item elevation={0} sx={{ backgroundColor: '#e9fdff' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Leads
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData?.totalLeads?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Doughnut data={leadchartdata} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>

    </>
  );
}

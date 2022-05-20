import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
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

// Chart Type
import { Doughnut, Bar } from 'react-chartjs-2'

// Register ChartJS
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
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const { admindashboarddata } = useSelector(state => state.admindashboarddata);

  // Load Data
  useEffect(() => {
    dispatch(getAdminDashboardData());
  }, [dispatch])

  // Set Data
  useEffect(() => {
    admindashboarddata && setDashboardData(admindashboarddata);
    admindashboarddata && setLoader(false);
  }, [admindashboarddata])


  // Prepare Data For Chart 

  // Member Active / Inactive Data
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

  // Member Gender Wise Data
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

  // Trainer Active / Inactive Data
  const traineractiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalTrainers?.filter(d => d.status === true).length, dashboardData.totalTrainers?.filter(d => d.status === false).length],
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

  // Membership Active / Inactive Data
  const membershipactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMemberships?.filter(d => d.status === true).length, dashboardData.totalMemberships?.filter(d => d.status === false).length],
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

  // Supplement Active / Inactive Data
  const supplementactiveinactivechartdata = {
    labels: ['Active  ', 'Inactive'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalSupplements?.filter(d => d.status === true).length, dashboardData.totalSupplements?.filter(d => d.status === false).length],
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

  // Invoice Paid / Unpaid Data
  const invoicechartpaidstatusdata = {
    labels: ['Paid    ', 'Unpaid'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalInvoices?.filter(d => d.totalamount === d.paidamount).length, dashboardData.totalInvoices?.filter(d => d.totalamount > d.paidamount).length],
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

  // Member Membership Status
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

  // Member Diet Plan
  const memberdietplanstatuschartdata = {
    labels: ['Diet Plan Set       ', 'Diet Plan Not Set'],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalMembers?.filter(d => d.dietplan !== '{}' && d.dietplan !== undefined).length, dashboardData.totalMembers?.filter(d => d.dietplan === undefined || d.dietplan === '{}').length],
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

  // Member Age Wise Data
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

  // Age Wise Data
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

  // Lead Data
  const leadchartdata = {
    labels: ['Completed  ', 'Pending      '],
    datasets: [
      {
        label: '# of Votes',
        data: [dashboardData.totalLeads?.filter(d => d.status === 'Completed').length, dashboardData.totalLeads?.filter(d => d.status === 'Pending').length],
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
        {loader && <LinearProgress />}
        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid item xs={12} md={6}>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
              <Grid item xs={6} md={6}>
                <Item elevation={0} sx={{ background: 'linear-gradient(to right bottom, #e9fdff,#e9fdff)' }}>
                  <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={12} >
                      <Typography variant="caption" display="block" gutterBottom>
                        This Month Earning
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#2c2c2c' }}>
                        {dashboardData?.totalInvoices?.filter(d => new Date(d.startdate).getMonth() === new Date().getMonth() && new Date(d.startdate).getFullYear() === new Date().getFullYear()).reduce((sum, d) => sum + d.totalamount, 0) || 0} ₹
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Received
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#369736' }}>
                        {dashboardData?.totalInvoices?.filter(d => new Date(d.startdate).getMonth() === new Date().getMonth() && new Date(d.startdate).getFullYear() === new Date().getFullYear()).reduce((sum, d) => sum + d.paidamount, 0) || 0} ₹
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Left
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#ff3e3e' }}>
                        {(dashboardData?.totalInvoices?.filter(d => new Date(d.startdate).getMonth() === new Date().getMonth() && new Date(d.startdate).getFullYear() === new Date().getFullYear()).reduce((sum, d) => sum + d.totalamount, 0) || 0) - (dashboardData?.totalInvoices?.filter(d => new Date(d.startdate).getMonth() === new Date().getMonth() && new Date(d.startdate).getFullYear() === new Date().getFullYear()).reduce((sum, d) => sum + d.paidamount, 0) || 0)} ₹
                      </Typography>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>

              <Grid item xs={6} md={6}>
                <Item elevation={0} sx={{ background: 'linear-gradient(to right bottom, #fff0e7, #fff0e7)' }}>
                  <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={12} >
                      <Typography variant="caption" display="block" gutterBottom>
                        Total Earning
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#2c2c2c' }}>
                        {dashboardData?.totalInvoices?.reduce((sum, d) => sum + d.totalamount, 0) || 0} ₹
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Received
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#369736' }}>
                        {dashboardData?.totalInvoices?.reduce((sum, d) => sum + d.paidamount, 0) || 0} ₹
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Left
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#ff3e3e' }}>
                        {(dashboardData?.totalInvoices?.reduce((sum, d) => sum + d.totalamount, 0) || 0) - (dashboardData?.totalInvoices?.reduce((sum, d) => sum + d.paidamount, 0) || 0)} ₹
                      </Typography>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>

              <Grid item xs={6} md={6} >
                <Item elevation={0} sx={{ backgroundColor: '#f3f0fb' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Invoices
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

              <Grid item xs={6} md={6}>
                <Item elevation={0} sx={{ backgroundColor: '#ecffeb' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Trainers
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
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Item elevation={0} sx={{ backgroundColor: '#f1f8ff' }}>
              <Grid container spacing={3}>

                <Grid item xs={6} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Members
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                    {dashboardData.totalMembers?.length || 0}
                  </Typography>

                </Grid>
                <Grid item xs={5} md={4} ml={6}>
                  <Doughnut data={membermembershipstatusdata} />
                  <Doughnut data={memberactiveinactivechartdata} />
                </Grid>
                <Grid item xs={5} md={4}>
                  <Doughnut data={membergenderchartdata} />
                  <Doughnut data={memberdietplanstatuschartdata} />
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
            <Item elevation={0} sx={{ backgroundColor: '#ffffff' }}>
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

        </Grid>
      </Box>

    </>
  );
}

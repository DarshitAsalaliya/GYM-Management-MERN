import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SupplementList from '../Home/Supplement/SupplementList';
import { Chip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getMemberDashboardData } from '../../Redux/actions/dashboardAction';

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

  const { memberdashboarddata } = useSelector(state => state.memberdashboarddata);

  // Load Data
  useEffect(() => {
    dispatch(getMemberDashboardData());
  }, [dispatch])

  useEffect(() => {
    memberdashboarddata && setDashboardData(memberdashboarddata);
    memberdashboarddata && setLoader(false);
  }, [memberdashboarddata])

  // Check Membership Status
  var membershipStatus = <Chip variant="outlined" color="warning" size="small" label="Invoice Not Found" />

  if (memberdashboarddata?.totalInvoices?.length > 0)
    membershipStatus = new Date(memberdashboarddata?.totalInvoices?.[0]?.expirydate.slice(0, 10)) < new Date(new Date().toISOString().slice(0, 10)) ? <Chip variant="outlined" color="error" size="small" label="Expired" /> : <Chip variant="outlined" color="success" size="small" label="Valid" />

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
          <Grid item xs={12} md={3}>
            {loader && <LinearProgress />}
            <Item elevation={0} sx={{ backgroundColor: '#FFFFFF' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Membership Status
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {membershipStatus}
              </Typography>

            </Item>
            <Item elevation={0} sx={{ backgroundColor: '#FFF7CD' }}>

              <Typography variant="caption" display="block" gutterBottom>
                Total Invoices
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#181616' }}>
                {dashboardData?.totalInvoices?.length || 0}
              </Typography>
            </Item>

          </Grid>
          <Grid item xs={12} md={9} sx={{ marginTop: { xs: '0px', md: '-35px' } }} >
            <SupplementList md="3" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

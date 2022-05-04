import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Card
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Style
import '../Utils/GlobalStyle.css';

// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Constants
import * as constants from '../../Redux/constants/userConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getLoggedUserData } from '../../Redux/actions/userAction';

// Axios
import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

export default function AdminProfile() {

  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  const { userdata, getdatasuccess } = useSelector(state => state.loggeduserdata);

  useEffect(() => {

    loadUserData();

  }, [getdatasuccess]);

  const loadUserData = async () => {

    await dispatch(getLoggedUserData('Admin'));

    userdata && setUserData(userdata);

  };
  console.log(userData);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" className='moduleHeading'>
              Admin Profile
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar alt="Cindy Baker" src={userData?.image?.image_url} sx={{ width: 80, height: 80 }} />
                  }
                  title={userData?.email}
                  subheader={userData?.createdAt}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>

            <Typography variant="h6" component="div" className='moduleHeading'>
              Change Password
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Card sx={{ maxWidth: 345 }} variant="outlined">
               
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>


    </>
  );
}

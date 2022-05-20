import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { LinearProgress } from '@mui/material';

// Grid
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import MembershipCard from './MembershipCard';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

export default function MembershipList(props) {

    // Fetch Membership List
    const [membershipList, setMembershipList] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchData = async () => {
        const { data } = await axios.get(REACT_APP_BASE_URL + 'api/Membership/GetActiveMembershipList');
        setMembershipList(data);
        data && setLoader(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }} mt={1} p={2}>
            <Typography variant="h6" sx={{ color: '#474747'}}>
                Memberships
            </Typography>
            <Divider />
            {loader && <LinearProgress />}
            <Grid container spacing={2} sx={{ marginTop: '0.01%' }}>
                {
                    membershipList.map((obj, i) => <Grid item xs={6} md={props.md ? props.md : 2} key={i}><MembershipCard data={obj} /></Grid>)
                }
            </Grid>
        </Box>
    );
}

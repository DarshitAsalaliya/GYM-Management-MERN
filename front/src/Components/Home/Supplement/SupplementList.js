import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BoltIcon from '@mui/icons-material/Bolt';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import SupplementCard from './SupplementCard';
// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getSupplementList } from '../../../Redux/actions/supplementAction';

export default function SupplementList() {

    const [supplementList, setSupplementList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getsupplementlist);

    useEffect(() => {

        loadSupplementList();

    }, [getlistsuccess]);

    const loadSupplementList = async () => {

        await dispatch(getSupplementList('Active'));

        const filterData = data?.filter(d => d.status === true);

        data && setSupplementList(filterData);
    };

    return (
        <Box sx={{ flexGrow: 1 }} mt={1} p={2}>
            <Typography variant="h6" sx={{ color: '#474747' }}>
                Supplements
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: '0.01%' }}>
                {
                    supplementList.map((obj) => <Grid item xs={6} md={2}><SupplementCard data={obj} /></Grid>)
                }
            </Grid>
        </Box>
    );
}

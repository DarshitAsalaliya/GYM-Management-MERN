import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { LinearProgress } from '@mui/material';

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SupplementCard from './SupplementCard';
// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getSupplementList } from '../../../Redux/actions/supplementAction';

export default function SupplementList(props) {

    const [supplementList, setSupplementList] = useState([]);
    const [loader, setLoader] = useState(true);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getsupplementlist);

    // Load Data
    useEffect(() => {

        loadSupplementList();

    }, [getlistsuccess]);

    const loadSupplementList = async () => {

        // Filter Active Data
        await dispatch(getSupplementList('Active'));

        const filterData = data?.filter(d => d.status === true);

        data && setSupplementList(filterData);
        data && setLoader(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }} mt={1} p={2}>
            <Typography variant="h6" sx={{ color: '#474747' }}>
                Supplements
            </Typography>
            <Divider />
            {loader && <LinearProgress />}
            <Grid container spacing={2} sx={{ marginTop: '0.01%' }}>
                {
                    supplementList.map((obj, i) => <Grid item xs={6} md={props.md ? props.md : 2} key={i}><SupplementCard data={obj} /></Grid>)
                }
            </Grid>
        </Box>
    );
}

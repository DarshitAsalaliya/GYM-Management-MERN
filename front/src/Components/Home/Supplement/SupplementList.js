import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BoltIcon from '@mui/icons-material/Bolt';

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

        await dispatch(getSupplementList());

        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            return obj;
        });

        data && setSupplementList(filterData);
    };

    return (
        <div style={{ height: 450, width: '100%', marginTop: '1%' }}>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        supplementList.map((obj) => <Grid item xs={6} md={3}><SupplementCard data={obj} /></Grid>)
                    }
                </Grid>
            </Box>


        </div>
    );
}

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BoltIcon from '@mui/icons-material/Bolt';

import ViewImage from '../../Utils/ViewImage';

// DeleteSupplement
import DeleteSupplement from './DeleteSupplement';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getSupplementList } from '../../../Redux/actions/supplementAction';

// Update Supplement
import UpdateSupplement from './UpdateSupplement';

export default function SupplementList() {

    const [supplementList, setSupplementList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getsupplementlist);

    // Load Data
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
            <DataGrid
                sx={{
                    '.MuiDataGrid-columnHeaderTitle': {
                        color: '#3c4854',
                        fontWeight: 600,
                    }
                }}
                getRowId={(row) => row._id}
                columns={[
                    {
                        field: 'image',
                        headerName: 'Image',
                        width: 60,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            params.value ? <ViewImage imageurl={params.value.image_url} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}><BoltIcon /></Avatar>
                        ),
                    },
                    {
                        field: 'supplementname',
                        headerName: 'Supplement Name',
                        description: 'Supplement Name',
                        width: 270
                    },
                    { field: 'price', headerName: 'Price', width: 100 },
                    {
                        field: 'status',
                        headerName: 'Status',
                        width: 100,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Active" /> : <Chip variant="outlined" color="error" size="small" label="Inactive" />

                        ),
                    },
                    { field: 'description', headerName: 'Description', width: 450 },
                    {
                        field: 'editid',
                        headerName: 'Edit',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateSupplement dataforupdate={supplementList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteSupplement id={params.value} />
                        ),
                    },
                ]}
                rows={supplementList}
            />
        </div>
    );
}

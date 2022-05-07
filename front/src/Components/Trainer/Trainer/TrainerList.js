import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Chip from '@mui/material/Chip';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';

// Constants
import * as constants from '../../../Redux/constants/trainerConstants';

// DeleteTrainer
import DeleteTrainer from './DeleteTrainer';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getTrainerList } from '../../../Redux/actions/trainerAction';

// Axios
import axios from 'axios';
import UpdateTrainer from './UpdateTrainer';
const { REACT_APP_BASE_URL } = process.env;

export default function TrainerList() {

    const [trainerList, setTrainerList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistloading, getlisterror, getlistsuccess } = useSelector(state => state.gettrainerlist);

    useEffect(() => {

        loadTrainerList();

    }, [getlistsuccess]);

    const loadTrainerList = async () => {

        await dispatch(getTrainerList());

        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            return obj;
        });

        data && setTrainerList(filterData);
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
                            params.value ? <Avatar src={params.value.image_url} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}><PersonIcon /></Avatar>
                        ),
                    },
                    {
                        field: 'name',
                        headerName: 'Name',
                        description: 'Trainer Name',
                        width: 200
                    },
                    {
                        field: 'email',
                        headerName: 'Email',
                        description: 'Email',
                        width: 240
                    },
                    { field: 'phone', headerName: 'Contact', width: 120 },
                    {
                        field: 'gender', headerName: 'Gender', width: 80,
                        renderCell: (params) => (

                            params.value === 'male' ? <BoyIcon /> : <GirlIcon />

                        ),
                    },
                    {
                        field: 'status',
                        headerName: 'Status',
                        width: 100,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Active" /> : <Chip variant="outlined" color="error" size="small" label="Inactive" />

                        ),
                    },
                    {
                        field: 'doj', headerName: 'Joining Date', width: 120, valueFormatter: (params) => {

                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'dob', headerName: 'Birth Date', width: 120, valueFormatter: (params) => {

                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    { field: 'bloodgroup', headerName: 'Blood', width: 60 },
                    {
                        field: 'editid',
                        headerName: 'Edit',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateTrainer dataforupdate={trainerList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteTrainer id={params.value} />
                        ),
                    },
                ]}
                rows={trainerList}
            />
        </div>
    );
}

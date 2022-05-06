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
import * as constants from '../../../Redux/constants/memberConstants';

// DeleteMember
import DeleteMember from './DeleteMember';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getMemberList } from '../../../Redux/actions/memberAction';

import UpdateMember from './UpdateMember';

import AddMemberInvoice from './AddMemberInvoice';

const { REACT_APP_BASE_URL } = process.env;

export default function MemberList() {

    const [memberList, setMemberList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistloading, getlisterror, getlistsuccess } = useSelector(state => state.getmemberlist);

    useEffect(() => {

        loadMemberList();

    }, [getlistsuccess]);

    const loadMemberList = async () => {

        await dispatch(getMemberList());

        const filterData = data?.map(function (obj) {
            obj['invoiceid'] = obj['_id'];
            obj['editid'] = obj['_id'];
            return obj;
        });

        data && setMemberList(filterData);
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
                        description: 'Member Name',
                        width: 200
                    },
                    { field: 'phone', headerName: 'Contact', width: 120 },
                    {
                        field: 'gender', headerName: 'Gender', width: 80,
                        renderCell: (params) => (

                            params.value === 'male' ? <BoyIcon /> : <GirlIcon />

                        ),
                    },
                    { field: 'workouttime', headerName: 'Time', width: 150 },
                    {
                        field: 'status',
                        headerName: 'Status',
                        width: 100,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Active" /> : <Chip variant="outlined" color="error" size="small" label="Inactive" />

                        ),
                    },
                    { field: 'workouttype', headerName: 'Workout Type', width: 120 },
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
                        field: "trainer", headerName: 'Trainer', width: 150, valueFormatter: (params) => {
                            return params?.value[0]?.name;
                        }
                    },
                    {
                        field: 'invoiceid',
                        headerName: 'Invoice',
                        width: 120,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <AddMemberInvoice dataforupdate={memberList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: 'editid',
                        headerName: 'Edit',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateMember dataforupdate={memberList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteMember id={params.value} />
                        ),
                    },
                ]}
                rows={memberList}
            />
        </div>
    );
}

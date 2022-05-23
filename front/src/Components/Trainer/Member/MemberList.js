import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Chip from '@mui/material/Chip';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import ViewImage from '../../Utils/ViewImage';

// Constants
import * as constants from '../../../Redux/constants/memberConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getMemberList } from '../../../Redux/actions/memberAction';

import UpdateMemberDietPlan from './UpdateMemberDietPlan';

export default function MemberList() {

    const [memberList, setMemberList] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [loader,setLoader] = useState(true);

    const dispatch = useDispatch();

    const { data, getlistloading, getlisterror, getlistsuccess } = useSelector(state => state.getmemberlist);

     // Load Data
     useEffect(() => {

        dispatch(getMemberList(page, size,'TrainerId'));

    }, [getlistsuccess, page]);

    useEffect(() => {

        if (data?.memberList === undefined) {
            page !== 1 && setPage(page - 1);
            return;
        }

        const filterData = data?.memberList;

        const tempData = filterData?.map(function (obj) {
            return {
                ...obj,
                editid: obj['_id'],
                invoiceid: obj['_id'],
                expirydate: obj['invoices'][obj['invoices']?.length - 1]?.expirydate,
                membershipstatus: obj['invoices']?.length > 0 ? new Date(obj['invoices'][obj['invoices']?.length - 1]?.expirydate.slice(0, 10)) < new Date(new Date().toISOString().slice(0, 10)) ? 'expired' : 'valid' : 'invoice not found',
            }
        });

        data && setMemberList(tempData);
        data && setTotalRecord(data.totalRecord);
        data && setLoader(false);
     
    }, [getlistsuccess, page, data])

    const getMembershipStatus = (type) => {
        if (type === 'expired')
            return <Chip variant="outlined" color="error" size="small" label="Expired" />
        else if (type === 'valid')
            return <Chip variant="outlined" color="success" size="small" label="Valid" />
        else
            return <Chip variant="outlined" color="warning" size="small" label="Invoice Not Found" />;
    }

    return (
        <div style={{ height: '75vh', width: '100%', marginTop: '1%' }}>
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
                            params.value ? <ViewImage imageurl={params.value.image_url} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}><PersonIcon /></Avatar>
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
                        field: 'membershipstatus',
                        headerName: 'Membership Status',
                        width: 150,
                        renderCell: (params) => (
                            getMembershipStatus(params.value)
                        ),
                    },
                    {
                        field: 'expirydate', headerName: 'Expiry Date', width: 120, valueFormatter: (params) => {

                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'dietplansetornot',
                        headerName: 'Diet Plan Status',
                        width: 150,
                        renderCell: (params) => (
                            params.value === 'Set' ? <Chip variant="outlined" color="success" size="small" label="Set" /> : <Chip variant="outlined" color="error" size="small" label="Not Set" />
                        ),
                    },
                    {
                        field: 'editid',
                        headerName: 'Diet Plan',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateMemberDietPlan dataforupdate={memberList.find(obj => obj.editid === params.value)} />
                        ),
                    },
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
                ]}
                rows={memberList}
                loading={loader}
                pageSize={size}
                rowCount={totalRecord}
                rowsPerPageOptions={[size]}
                paginationMode="server"
                onPageChange={(newPage) => { setLoader(true); setPage(newPage + 1) }}
            />
        </div>
    );
}

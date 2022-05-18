import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

// DeleteMembership
import DeleteMembership from './DeleteMembership';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getMembershipList } from '../../../Redux/actions/membershipAction';

import UpdateMembership from './UpdateMembership';

export default function MembershipList() {

    // State
    const [membershipList, setMembershipList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getmembershiplist);

    // Load Data
    useEffect(() => {

        loadMembershipList();

    }, [getlistsuccess]);

    const loadMembershipList = async () => {

        await dispatch(getMembershipList());

        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            return obj;
        });

        data && setMembershipList(filterData);
    };

    return (
        <div style={{ height: 450, width: '100%', marginTop: '1%' }}>
            <DataGrid
                sx={{
                    '.MuiDataGrid-columnHeaderTitle':{
                        color:'#3c4854',
                        fontWeight:600,
                    }
                }}
                getRowId={(row) => row._id}
                columns={[
                    {
                        field: 'membershipname',
                        headerName: 'Membership Name',
                        description: 'Membership Name',
                        width: 250
                    },

                    {
                        field: 'duration', headerName: 'Duration', width: 120, valueFormatter: (params) => {
                            return params.value + ' Months';
                        }
                    },
                    { field: 'amount', headerName: 'Amount', width: 100 },
                    {
                        field: 'status',
                        headerName: 'Status',
                        width: 100,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Active" /> : <Chip variant="outlined" color="error" size="small" label="Inactive" />

                        ),
                    },
                    { field: 'description', headerName: 'Description', width: 350 },
                    {
                        field: 'editid',
                        headerName: 'Edit',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateMembership dataforupdate={membershipList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteMembership id={params.value} />
                        ),
                    },
                ]}
                rows={membershipList}
            />
        </div>
    );
}

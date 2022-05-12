import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

// DeleteLead
import DeleteLead from './DeleteLead';

// UpdateLead
import UpdateLead from './UpdateLead';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getLeadList } from '../../../Redux/actions/leadAction';

export default function LeadList() {

    const [leadList, setLeadList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getleadlist);

    useEffect(() => {

        loadLeadList();

    }, [getlistsuccess]);

    const loadLeadList = async () => {

        await dispatch(getLeadList());

        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            return obj;
        });

        data && setLeadList(filterData);
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
                        field: 'createdAt', headerName: 'Date', width: 120, valueFormatter: (params) => {
                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'name',
                        headerName: 'Name',
                        description: 'Name',
                        width: 270
                    },
                    {
                        field: 'query',
                        headerName: 'Query',
                        description: 'Query',
                        width: 270
                    },
                    { field: 'phone', headerName: 'Phone', width: 150 },

                    {
                        field: 'editid',
                        headerName: 'Status',
                        width: 150,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateLead id={params.value} currentstatus={leadList.find(d => d._id === params.value).status} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteLead id={params.value} />
                        ),
                    },
                ]}
                rows={leadList}
            />
        </div>
    );
}

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Grid
import Box from '@mui/material/Box';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;

export default function MembershipList() {

    // Fetch Membership List
    const [membershipList, setMembershipList] = useState([]);

    const fetchData = async () => {
        const { data } = await axios.get(REACT_APP_BASE_URL + 'api/Membership/GetActiveMembershipList');
        setMembershipList(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }} mt={1} p={2}>
            <Typography variant="h6" sx={{ color: '#474747' }}>
                Memberships
            </Typography>
            <Divider />
            <div style={{ height: 400, width: '100%', marginTop: '1%' }}>
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
                            field: 'membershipname',
                            headerName: 'Membership',
                            width: 300
                        },
                        {
                            field: 'duration', headerName: 'Duration', width: 150, valueFormatter: (params) => {
                                return params.value + ' Months';
                            }
                        },
                        { field: 'amount', headerName: 'Amount', width: 150 },
                        { field: 'description', headerName: 'Description', width: 450 },

                    ]}
                    rows={membershipList}
                />
            </div>
        </Box>
    );
}

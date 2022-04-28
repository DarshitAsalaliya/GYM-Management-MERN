import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;


export default function MemberList() {

    const [memberList, setMemberList] = useState([]);

    const fetchData = async () => {

        const { data } = await axios.get(REACT_APP_BASE_URL + 'api/Member/GetMemberList');

        const filterData = data.map(function (obj) {
            obj['id'] = obj['_id'];
            delete obj['_id'];
            return obj;
        });

        setMemberList(filterData);
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div style={{ height: 450, width: '100%', marginTop: '1%' }}>
            <DataGrid
                columns={[
                    {
                        field: 'name',
                        headerName: 'Name',
                        description: 'Member Name',
                        width: 200
                    },
                    { field: 'phone', headerName: 'Contact', width: 120 },
                    { field: 'gender', headerName: 'Gender', width: 100 },
                    { field: 'workouttime', headerName: 'Time', width: 150 },
                    { field: 'status', headerName: 'Status', width: 60 },
                    {
                        field: 'doj', headerName: 'Joining Date', width: 200, valueFormatter: (params) => {
                          
                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'id',
                        headerName: 'Delete',
                        width: 85,
                        renderCell: (params) => (
                            <strong>
                                <Button variant="outlined" color='error'>
                                    <DeleteIcon fontSize="small" />
                                </Button>
                            </strong>
                        ),
                    },
                ]}
                rows={memberList}
            />
        </div>
    );
}

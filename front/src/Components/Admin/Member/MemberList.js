import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

// DeleteMember
import DeleteMember from './DeleteMember';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getMemberList } from '../../../Redux/actions/memberAction';

// Axios
import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;


export default function MemberList() {

    const [memberList, setMemberList] = useState([]);

    const dispatch = useDispatch();
    const { data, getlistloading, getlisterror, getlistsuccess } = useSelector(state => state.getmemberlist);

    const loadMemberList = async () => {

        await dispatch(getMemberList());

        const filterData = data?.map(function (obj) {
            obj['id'] = obj['_id'];
            delete obj['_id'];
            return obj;
        });

        data && setMemberList(filterData);
    };

    useEffect(() => {
        loadMemberList();
    }, [data]);

    console.log("list---", memberList)
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
                        field: 'doj', headerName: 'Joining Date', width: 120, valueFormatter: (params) => {

                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: "trainer", headerName: 'Trainer', width: 150, valueFormatter: (params) => {
                            return params?.value[0].name;
                        }
                    },
                    {
                        field: 'id',
                        headerName: 'Delete',
                        width: 85,
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

import { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

import '../../Utils/GlobalStyle.css';

// Constants
import * as constants from '../../../Redux/constants/userConstants';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getLoggedUserData } from '../../../Redux/actions/userAction';

export default function MemberDietPlan() {

    const [userData, setUserData] = useState([]);

    const dispatch = useDispatch();

    const { userdata, getdatasuccess } = useSelector(state => state.loggeduserdata);

    useEffect(() => {

        dispatch(getLoggedUserData('Member'));

    }, []);

    useEffect(() => {

        userdata && setUserData(userdata);

    }, [userdata]);

    const dietplan = userData?.dietplan && JSON.parse(userData?.dietplan);

    const dietList = [
        { id: 1, day: 'Sunday', breakfast: dietplan?.sundaybreakfast, lunch: dietplan?.sundaylunch, dinner: dietplan?.sundaydinner, snacks: dietplan?.sundaysnacks, },
        { id: 2, day: 'Monday', breakfast: dietplan?.mondaybreakfast, lunch: dietplan?.mondaylunch, dinner: dietplan?.mondaydinner, snacks: dietplan?.mondaysnacks, },
        { id: 3, day: 'Tuesday', breakfast: dietplan?.tuesdaybreakfast, lunch: dietplan?.tuesdaylunch, dinner: dietplan?.tuesdaydinner, snacks: dietplan?.tuesdaysnacks, },
        { id: 4, day: 'Wednesday', breakfast: dietplan?.wednesdaybreakfast, lunch: dietplan?.wednesdaylunch, dinner: dietplan?.wednesdaydinner, snacks: dietplan?.wednesdaysnacks, },
        { id: 5, day: 'Thursday', breakfast: dietplan?.thursdaybreakfast, lunch: dietplan?.thursdaylunch, dinner: dietplan?.thursdaydinner, snacks: dietplan?.thursdaysnacks, },
        { id: 6, day: 'Friday', breakfast: dietplan?.fridaybreakfast, lunch: dietplan?.fridaylunch, dinner: dietplan?.fridaydinner, snacks: dietplan?.fridaysnacks, },
        { id: 7, day: 'Saturday', breakfast: dietplan?.saturdaybreakfast, lunch: dietplan?.saturdaylunch, dinner: dietplan?.saturdaydinner, snacks: dietplan?.saturdaysnacks, }
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            </GridToolbarContainer>
        );
    }

    return (

        <div style={{ height: 450, width: '100%', marginTop: '1%' }}>
            <DataGrid
                components={{
                    Toolbar: CustomToolbar,
                }}
                sx={{
                    '.MuiDataGrid-columnHeaderTitle': {
                        color: '#3c4854',
                        fontWeight: 600,
                    },
                }}
                getRowId={(row) => row.id}
                columns={[

                    {
                        field: 'day',
                        headerName: 'Day',
                        width: 150
                    },
                    {
                        field: 'breakfast',
                        headerName: 'Breakfast',
                        width: 320,
                        renderCell: (params) => (
                            <div title={params.value}>{params.value?.length>40?params.value?.slice(0,40) + '..' : params.value?.slice(0,40)}</div>
                        ),
                    },
                    {
                        field: 'lunch',
                        headerName: 'Lunch',
                        width: 320,
                        renderCell: (params) => (
                            <div title={params.value}>{params.value?.length>40?params.value?.slice(0,40) + '..' : params.value?.slice(0,40)}</div>
                        ),
                    },
                    {
                        field: 'dinner',
                        headerName: 'Dinner',
                        width: 320,
                        renderCell: (params) => (
                            <div title={params.value}>{params.value?.length>40?params.value?.slice(0,40) + '..' : params.value?.slice(0,40)}</div>
                        ),
                    },
                    {
                        field: 'snacks',
                        headerName: 'Snacks',
                        width: 320,
                        renderCell: (params) => (
                            <div title={params.value}>{params.value?.length>40?params.value?.slice(0,40) + '..' : params.value?.slice(0,40)}</div>
                        ),
                    },
                ]}
                rows={dietList}
            />
        </div>

    );
}

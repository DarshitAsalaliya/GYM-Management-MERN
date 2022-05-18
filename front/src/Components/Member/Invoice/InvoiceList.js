import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

// Print Invoice
import InvoicePrint from '../../Utils/InvoicePrint';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getInvoiceList } from '../../../Redux/actions/invoiceAction';

export default function InvoiceList() {

    const [invoiceList, setInvoiceList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getinvoicelist);
    const { userdata, getdatasuccess } = useSelector(state => state.loggeduserdata);

    useEffect(() => {

        loadInvoiceList();

    }, [getlistsuccess]);

    const loadInvoiceList = async () => {

        await dispatch(getInvoiceList('MemberId'));
        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            obj['membershipexpirydate'] = obj['expirydate'];
            obj['paymentstatus'] = obj['status'] === true ? true : obj['totalamount'] - obj['paidamount']
            return obj;
        });

        data && setInvoiceList(filterData);
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
                        field: 'startdate', headerName: 'Start Date', width: 120, valueFormatter: (params) => {

                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'expirydate', headerName: 'Expiry Date', width: 120, valueFormatter: (params) => {
                            const valueFormatted = new Date(params.value).toLocaleDateString();
                            return `${valueFormatted}`;
                        }
                    },
                    {
                        field: 'totalamount', headerName: 'Invoice Amount', width: 110, valueFormatter: (params) => {
                            const valueFormatted = params.value + ' Rs.';
                            return `${valueFormatted}`;
                        }
                    },
                    { field: 'paidamount', headerName: 'Paid Amount', width: 110 },
                    {
                        field: 'membershipexpirydate',
                        headerName: 'Membership Status',
                        width: 150,
                        renderCell: (params) => (
                            new Date(params.value.slice(0,10)) < new Date(new Date().toISOString().slice(0,10)) ? <Chip variant="outlined" color="error" size="small" label="Expired" /> : <Chip variant="outlined" color="success" size="small" label="Valid" />
                        ),
                    },
                    {
                        field: 'paymentstatus',
                        headerName: 'Payment Status',
                        width: 150,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Paid" /> : <Chip variant="outlined" color="error" size="small" label={`${params.value} ₹ Unpaid`} />

                        ),
                    },
                    { field: 'paymentmode', headerName: 'Payment Mode', width: 150 },
                    { field: 'paymentdetail', headerName: 'Payment Detail', width: 150 },
                    {
                        field: '_id',
                        headerName: 'Print',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <InvoicePrint data={invoiceList.find(obj => obj._id === params.value)}/>
                        ),
                    },
                ]}
                rows={invoiceList}
            />
        </div>
    );
}

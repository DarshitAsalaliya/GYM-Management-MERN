import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import InvoicePrint from '../../Utils/InvoicePrint';
// DeleteInvoice
import DeleteInvoice from './DeleteInvoice';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { getInvoiceList } from '../../../Redux/actions/invoiceAction';

import UpdateInvoice from './UpdateInvoice';

export default function InvoiceList() {

    const [invoiceList, setInvoiceList] = useState([]);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getinvoicelist);

    useEffect(() => {

        loadInvoiceList();

    }, [getlistsuccess]);

    const loadInvoiceList = async () => {

        await dispatch(getInvoiceList());

        const filterData = data?.map(function (obj) {
            obj['editid'] = obj['_id'];
            obj['invoiceid'] = obj['_id'];
            obj['membershipexpirydate'] = obj['expirydate'];
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
                            new Date(params.value).toLocaleDateString() <= new Date().toLocaleDateString() ? <Chip variant="outlined" color="error" size="small" label="Expired" /> : <Chip variant="outlined" color="success" size="small" label="Valid" />
                        ),
                    },
                    {
                        field: 'status',
                        headerName: 'Payment Status',
                        width: 130,
                        renderCell: (params) => (

                            params.value === true ? <Chip variant="outlined" color="success" size="small" label="Paid" /> : <Chip variant="outlined" color="error" size="small" label="Unpaid" />

                        ),
                    },
                    { field: 'paymentmode', headerName: 'Payment Mode', width: 150 },
                    { field: 'paymentdetail', headerName: 'Payment Detail', width: 150 },
                    {
                        field: 'invoiceid',
                        headerName: 'Print',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <InvoicePrint data={invoiceList.find(obj => obj.invoiceid === params.value)}/>
                        ),
                    },
                    {
                        field: 'editid',
                        headerName: 'Edit',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <UpdateInvoice dataforupdate={invoiceList.find(obj => obj.editid === params.value)} />
                        ),
                    },
                    {
                        field: '_id',
                        headerName: 'Delete',
                        width: 85,
                        sortable: false,
                        filterable: false,
                        renderCell: (params) => (
                            <DeleteInvoice id={params.value} />
                        ),
                    },
                ]}
                rows={invoiceList}
            />
        </div>
    );
}

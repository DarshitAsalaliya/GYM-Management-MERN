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

    // State
    const [invoiceList, setInvoiceList] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [loader, setLoader] = useState(true);

    const dispatch = useDispatch();

    const { data, getlistsuccess } = useSelector(state => state.getinvoicelist);

    // Load Data

    useEffect(() => {

        dispatch(getInvoiceList(page, size, 'MemberId'));

    }, [page]);

    useEffect(() => {

        if (data?.invoiceList !== undefined) {
            const filterData = data?.invoiceList;

            const tempData = filterData?.map(function (obj) {

                return {
                    ...obj,
                    editid: obj['_id'],
                    invoiceid: obj['_id'],
                    membershipexpirydate: obj['expirydate'],
                    membername: obj['member'][0]?.name,
                    paymentstatus: obj['status'] === true ? true : obj['totalamount'] - obj['paidamount']
                }
            });

            data && setInvoiceList(tempData);
            data && setTotalRecord(data.totalRecord);
            data && setLoader(false);
        }
        else {
            data && setInvoiceList([]);
            data && setLoader(false);
        }
        
    }, [getlistsuccess, page, data])

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
                            new Date(params.value.slice(0, 10)) < new Date(new Date().toISOString().slice(0, 10)) ? <Chip variant="outlined" color="error" size="small" label="Expired" /> : <Chip variant="outlined" color="success" size="small" label="Valid" />
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
                            <InvoicePrint data={invoiceList.find(obj => obj._id === params.value)} />
                        ),
                    },
                ]}
                rows={invoiceList}
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

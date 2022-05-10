import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';


export default function InvoicePrint(props) {

    const pdfGenerate = () => {
        const doc = new jsPDF('landscape', 'px', 'a6', false);
    
        doc.addImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNKRPHNSYAedHfwe-GWXn9shsirWZhJk4T4rIRf9JKW52hXGIFzTc8Xf0plWDABmfnowA&usqp=CAU', 'PNG', 225, 155, 85, 70);

        doc.addImage(props.data?.member?.[0].image?.image_url ? props.data?.member?.[0].image?.image_url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png', 'PNG', 250, 10, 50, 50);
        doc.setTextColor('#221E1F');
        doc.setFont('courier', 'bold');
      
        doc.text('---- GYM Invoice ----', 85, 15);
        doc.setFontSize(13)
        doc.text('Member Name  :', 10, 60);
        doc.text('Start  Date  :', 10, 80);
        doc.text('Expiry Date  :', 10, 100);
        doc.text('Total Amount :', 10, 120);
        doc.text('Paid  Amount :', 10, 140);
        doc.text('Payment Mode :', 10, 160);
        doc.text('Owner Sign : ______________', 10, 210);

        doc.setTextColor('#313131');
        doc.setFont('courier', '', 'normal');
        doc.text(props.data?.member?.[0].name, 120, 60);
        doc.text(props.data?.startdate.slice(0, 10), 120, 80);
        doc.text(props.data?.expirydate.slice(0, 10), 120, 100);
        doc.text(props.data?.totalamount + ' Rs.', 120, 120);
        doc.text(props.data?.paidamount + ' Rs.', 120, 140);
        doc.text(props.data?.paymentmode, 120, 160);
        doc.save("two-by-four.pdf");
    }
    console.log(props.data);
    return (
        <div>
            <Button variant="outlined" color='info' onClick={pdfGenerate}>
                <PrintIcon fontSize="small" />
            </Button>
        </div>
    );
}

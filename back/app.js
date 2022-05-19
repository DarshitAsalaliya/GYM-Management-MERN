const express = require('express');
const app = express();
const cors = require('cors');

// DOTENV
require('dotenv').config();
const port = process.env.PORT || 3000;

// Cloudinary
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// For JSON Support
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// CORS
app.use(cors());

// Connection
require('./src/db/connection');

app.get('/',(req,res)=>{
    res.send('Welcome');
});

// Set Owner Router
const ownerRoute = require('./src/routes/OwnerRoute');
app.use(ownerRoute);

// Set Trainer Router
const trainerRoute = require('./src/routes/TrainerRoute');
app.use(trainerRoute);

// Set Member Router
const memberRoute = require('./src/routes/MemberRoute');
app.use(memberRoute);

// Set Membership Router
const membershipRoute = require('./src/routes/MembershipRoute');
app.use(membershipRoute);

// Set Invoice Router
const invoiceRoute = require('./src/routes/InvoiceRoute');
app.use(invoiceRoute);

// Set Supplement Router
const supplementRoute = require('./src/routes/SupplementRoute');
app.use(supplementRoute);

// Set Lead Router
const leadRoute = require('./src/routes/LeadRoute');
app.use(leadRoute);

// Set Dashboard Router
const dashboardRoute = require('./src/routes/DashboardRoute');
app.use(dashboardRoute);

// Set Notification Router
const notificationRoute = require('./src/routes/NotificationRoute');
app.use(notificationRoute);

app.listen(port, () => { });
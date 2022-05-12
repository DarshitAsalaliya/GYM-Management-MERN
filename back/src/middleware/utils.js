// Check Parameter
const checkParameters = (bodyObject, parameterArray) => {
    const updates = Object.keys(bodyObject);
    const allowedUpdates = parameterArray;

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return false;
    }
    else {
        return true;
    }
}


// Send Mail
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '17bmiit118@gmail.com',
        pass: 'Have@Your#Cake$And%'
    }
});
const sendCredentialMail = (toMail,password) => {

    const mailOptions = {
        from: '17bmiit118@gmail.com',
        to: toMail,
        subject: 'GYM Credentials',
        html: `<!DOCTYPE html>
        <html>
        <head>
        <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 50%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        </style>
        </head>
        <body>
        
        <table>
          <tr>
            <th colspan="2">Credential</th>
          </tr>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
          <tr>
            <td>${toMail}</td>
            <td>${password}</td>
          </tr>
        </table>
        
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
           
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });

}


module.exports = { checkParameters, sendCredentialMail }
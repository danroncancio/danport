const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.H_MAIL,
        pass: process.env.H_PW
    }
});

const app = new express();

app.use(cors());
app.use(express.json());

app.post('/mail', (req, res) => {
    transporter.sendMail({
        from: {
            address: 'daniel_roncancio95@hotmail.com',
            name: 'Dan Portfolio'
        },
        to: 'daniel.roncancio95@gmail.com',
        subject: 'Dan Portfolio Message!',
        html: `
        <h3>You have mail! 📬</h3>
        <h2>Contact Details:</h2>

        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message:</h3>
        <p>${req.body.msg}</p>
        `
    });
    console.log('Success!!! ✔ Mail sent');
    
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));

    app.get(/.*/, (req, res) => res.sendFlie(__dirname + '/public/index.html') )
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Hi 🙌 Server listening 👂');
})
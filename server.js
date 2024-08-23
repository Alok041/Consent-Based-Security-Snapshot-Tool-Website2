const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend URL
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from your frontend
    credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' })); // Middleware to parse JSON bodies with a size limit of 10MB

app.post('/upload', async (req, res) => {
    const { image } = req.body;
    console.log('Received image data:', image.slice(0, 30)); // Log a portion of the image data for debugging

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ag8229672@gmail.com',
            pass: 'vcqghuiizyuarnqp' // Use your Gmail app password here
        }
    });

    const mailOptions = {
        from: 'ag8229672@gmail.com',
        to: 'i88223430@gmail.com',
        subject: 'Wrong Password Attempt',
        text: 'A wrong password attempt was detected.',
        attachments: [{
            filename: 'snapshot.jpg',
            content: image,
            encoding: 'base64'
        }]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

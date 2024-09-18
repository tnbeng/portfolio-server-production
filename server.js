const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors=require('cors')
const app = express();

require('dotenv').config();
const port = process.env.PORT || 8082;

// https://tarak-nath-bar-portfolio.vercel.app/
// Middleware
app.use(cors({
  origin: 'https://tarak-nath-bar-portfolio.vercel.app',  // Allow only requests from your frontend URL
  methods: ['GET', 'POST'],          // Allow specific HTTP methods
  credentials: true                  // If using cookies or authorization headers
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test',(req,res)=>{
    console.log("Everything is okay")
    res.json({message:"Server is running "})
})
// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;
    const mailOptions = {
      from: email,
      to: 'btarak398@gmail.com',
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occured ",error.message)
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('Email sent successfully');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


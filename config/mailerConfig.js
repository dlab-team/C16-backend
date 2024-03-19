var nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    
    console.log('Error sending mail: ', error);
  }
};

module.exports = {
    sendEmail: sendEmail
  };
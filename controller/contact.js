const Contact = require("../models/contact");
const dotenv=require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
module.exports={
    
    AddContact: async(req,res)=>{
        try {
            const { name, email, phone,  message } = req.body;
            await Contact.create({ name, email, phone, message });
            res.redirect('/contact')
            console.log('contact saved scucessfully');
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'adgroupap@gmail.com',
                subject: `Website Contact Form  Data`,
                html: `
                  <h1>Contact Form Enquiry</h1><br/>
                  Name: ${name}<br/><br/>
                  Email: ${email}<br/><br/>
                  Subject: ${phone}<br/><br/>
                  Message:${message}<br/><br/>
                `
              }; 
            
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending email:', error);
                } else {
                  console.log('Email sent:', info.response );
                }
              });

        } catch (error) {
            console.log(error);
            res.render('error')
        }
    }
}
const nodemailer = require("nodemailer");
require("dotenv").config;
const Sendmail = async(usermail,fileName,fileBuffer) =>{
   try{
     const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.NODEMAILER_USER,
         pass : process.env.NODEMAILER_PASS
       }
     });
     const mailOptions = {
       from: '<lasalleabbadi@gmail.com>',
       to : usermail,
       subject : "Rendez-Vous",
       html : `<h1> Salle Abbadi </h1>
       <p>la date de votre rendez-vous est modifiée </p>`,
       attachments:[
         {
           filename:fileName,
           content: fileBuffer
         }
       ]
     }
     const info = await transporter.sendMail(mailOptions);
   }
   catch(err){
     console.log(err);
   }
 }
 

module.exports = {Sendmail}


const express = require("express")
const app = express()
const cors = require("cors")
const multer = require("multer")
const {Uploadimgs} = require("./cloud")
const {Sendmail} = require("./mailsender")
const mongoose = require("mongoose")
const path = require("path")
const fs = require("fs")
const rendezvous = require("./schema")
const admin = require("./adminschema")
require('dotenv').config();
app.use(cors())
app.use(express.json())
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "./uploads");
   },
   filename: (req, file, cb) => {
     cb(null, file.originalname);
   },
 });
 function apiKeyAuth(req, res, next) {
   const apiKey = req.headers['x-api-key'];
   if (!apiKey || apiKey != process.env.NODE_ENV_API_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   next();
 }
 
 const upload = multer({storage});

mongoose.connect(process.env.MONGOOSE_URL)

app.get("/rv-list",async(req,res)=>{
   const clients = await rendezvous.find();
   res.json(clients)
})
app.get("/admin-infos",apiKeyAuth,async(req,res)=>{
   const Admin = await admin.find();
   res.json(Admin)
})
app.post("/rendez-vous", apiKeyAuth ,(req,res)=>{
   const {Nom,Prenom,Email,Telephone,Date,Time,Code} = req.body
  
   const meeting = new rendezvous({
           Nom : Nom, 
           Prenom : Prenom,
           Email : Email,
           Telephone : Telephone,
           Date : Date,
           Temps : Time,
           Code : Code
});
   meeting.save()
})
app.put('/rendez-vous/:id', apiKeyAuth ,upload.single('PdfFile') , async (req, res) => {
   const {Date,Temps,Email} = req.body;
   const PdfFile = req.file.filename; 
   const pdfpath = path.join(__dirname,`./uploads/${PdfFile}`);
   const uploading = await Uploadimgs(pdfpath)
   const Sending = await Sendmail(Email,PdfFile,pdfpath);
   const updatedMeeting = await rendezvous.findOneAndUpdate(
     { _id: req.params.id },
     { Date : Date,
       Temps : Temps,  
      }, 
     { new: true }
   );
   res.json(updatedMeeting); 
   fs.unlinkSync(pdfpath)
 });
 

 //fxjqhwwhdgctezin
app.delete('/rendez-vous/:id', apiKeyAuth ,async (req, res) => {
   await rendezvous.findOneAndDelete({ _id: req.params.id });
   res.status(204).send();
 });
 

app.listen(process.env.PORT || 368)

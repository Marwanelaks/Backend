const cloudinary = require("cloudinary");

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_KEY ,
   api_secret: process.env.CLOUDINARY_SECRET
});

const Uploadimgs = async(pdfpath) =>{
  try{
   const data = await cloudinary.uploader.upload(pdfpath,{
      resource_type: 'auto',
   }); 
   return data;
  }catch (err){
   return err;
  }
}
 module.exports = {Uploadimgs}
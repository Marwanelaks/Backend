const mongoose = require ("mongoose")

const admin = new mongoose.Schema({
   Email : {
      type : String
   },
   Password : {
      type : String
   }
})
//9315a11fd
const adminschema = mongoose.model("Admin",admin)
module.exports = adminschema
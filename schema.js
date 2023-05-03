const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
   Nom: {
      type: String,
      required : true
    },
    Prenom: {
      type: String,
      required : true
    },
    Email: {
      type: String,
      required : true
    },
    Telephone: {
      type: String,
      required : true
    },
    Date:{
      type:Date,
      required : true
    },
    Temps:{
      type:String,
      required : true
    },
    Code:{
      type:String,
      required : true
    }
})

const RendezVous = mongoose.model("Rendez-Vous",Schema)
module.exports = RendezVous
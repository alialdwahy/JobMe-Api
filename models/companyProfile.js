const mongoose = require("mongoose")

const CompanyProfaileSchema = new mongoose.Schema({
   userid:{
    type: String
   },
    Coname: {
        type: String     
      },
    email: {
        type: String,
        require: true,
        unique:true
    },
    emailToken: {
        type: String,
      },   
    Employment:{
        type:String,
        require: true
    },
    EstablishmentDate:{
        type:String,
        default: Date.now
    },
    CompanySize:{
        type:String,
        require: true

    },
    OtherInformation:{
        type:String,
        require: true
    },
    Country:{
        type:String,
        default:"Kuwait"
    },
    City:{
        type:String,
        require: true
    },
    NumberOfEmploy:{
        type:String,
        require: true
    }
},
{ timestamps: true }
);
const CompanyProfaile= new mongoose.model("CompanyProfaile", CompanyProfaileSchema);
module.exports=CompanyProfaile;

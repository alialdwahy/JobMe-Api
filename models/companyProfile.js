const mongoose = require("mongoose")

const CompanyProfaileSchema = new mongoose.Schema({
   userid:{
    type: String
   },
    Coname: {
        type: String,
        ref: 'User'
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
        type:Date,
        default: Date.now
    },
    CompanySize:{
        type:Number,
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
        type:Number,
        require: true
    }
},
{ timestamps: true }
);
const CompanyProfaile= new mongoose.model("CompanyProfaile", CompanyProfaileSchema);
module.exports=CompanyProfaile;

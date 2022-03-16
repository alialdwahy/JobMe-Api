const mongoose = require("mongoose")
const validator = require("validator")


const CompanyProfaileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    email: {
        type: String,
        require: true
    },
    Employment:{
        type:string,
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
        type:string,
        default:"Kuwait"
    },
    City:{
        type:string,
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

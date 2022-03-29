const mongoose = require("mongoose")

const CompanyProfaileSchema = new mongoose.Schema({
   userid:{
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
       coins:
      {
       type:Number,
       default:0   
      },
         profilePicture: {
        type:String,
        default:"",
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
    },
      verified: {
        type: Boolean,
        default: false 
      }
},
{ timestamps: true }
);
const CompanyProfaile= new mongoose.model("CompanyProfaile", CompanyProfaileSchema);
module.exports=CompanyProfaile;

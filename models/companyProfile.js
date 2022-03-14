const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const CompanyProfaileSchema = new mongoose.Schema({
     CompanyId:{
         type:Number
     },
    //Persoanl
    CompanyName: {
        type: String
    },
    email: {
        type: String
    },
    Employment:{
        type:string
    },
    EstablishmentDate:{
        type:Date
    },
    CompanySize:{
        type:Number
    },
    OtherInformation:{
        type:String
    }
})
module.exports = new mongoose.model("CompanyProfaileSchema", CompanyProfaileSchema)

const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserProfaileSchema = new mongoose.Schema({
     Userid:{
         type:Number
     },
    //Persoanl
     username: {
        type: String
    },
    email: {
        type: String
    },
    DateOfBirth:
    {
        type:Date,
        required: [true, "Please add a Date Of Birth"],
        default: "1/1/1990"
    },
    Gender:{
        type:String,
        enum: ["Male", "Female"]
    },
    
    Otherinformation:{
        type:String
    },

    //Education
    EducationName:{
        type:String
    },
    Specialization:{
        type:string
    },
    Educationlevel:{
        type:string
    },
    Ed_StartDate:{
        type:Date,
        default: "1/1/1990"
            },
    Ed_EndDate:{
        type:Date,
        default: "1/1/1990"
        },
    Appreciation:{
        Type:string    
    },
    Country:{
        type:string
    },
    
    //Company And Experiences 
    CompanyName:{
        type:string
    },
    Field:{
        type:string
    },
    Jobtitle:{
        type:string
    },
    Wo_StartDate:{
        type:Date,
        default: "1/1/1990"
    },
    Wo_EndDate:{
        type:Date,
        default: "1/1/1990"
    },
    JobDescription:{
        type:string
    },
    Country:{
        type:string
    },

    // Certificate or Course
    COCName:{
        type:string
    },
    NameOfDonor:{
        type:string
    },
    ObtainedDate:{
        type:Date,
        default: "1/1/1990"
    },
    Field:{
        type:string
    },
    Description:{
        type:string
    },

    //skills
    skills:{
        type:string
    }
    })
    module.exports = new mongoose.model("UserProfaileSchema", UserProfaileSchema)
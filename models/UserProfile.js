const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserProfaileSchema = new mongoose.Schema({
     Userid:{
         type:String,
      require: true
     },
    //Persoanl
     username: {
        type: String,
      require: true
    },
    email: {
        type: String,
        require: true
    },
    DateOfBirth:
    {
        type:Date,
        required: [true, "Please add a Date Of Birth"],
        default: Date.now
    },
    Gender:{
        type:String,
        enum: ["Male", "Female"],
      require: true
    },
    
    Otherinformation:{
        type:String,
        require: true
    },
    //Education
    EducationName:{
        type:String,
        require: true
    },
    Specialization:{
        type:string,
        require: true
    },
    Educationlevel:{
        type:string,
        require: true
    },
    Ed_StartDate:{
        type:Date,
        default: Date.now
            },
    Ed_EndDate:{
        type:Date,
        default: Date.now
        },
    Appreciation:{
        Type:string,
        require: true
    },
    Country:{
        type:string,
        require: true
    },    
    //Company And Experiences 
    CompanyName:{
        type:string,
        require: true
    },
    Field:{
        type:string,
        require: true
    },
    Jobtitle:{
        type:string,
        require: true
    },
    Wo_StartDate:{
        type:Date,
        default: Date.now
    },
    Wo_EndDate:{
        type:Date,
        default: Date.now
    },
    JobDescription:{
        type:string,
        require: true
    },
    Country:{
        type:string,
        require: true
    },

    // Certificate or Course
    COCName:{
        type:string,
        require: true
    },
    NameOfDonor:{
        type:string,
        require: true
    },
    ObtainedDate:{
        type:Date,
        default: Date.now
    },
    Field:{
        type:string,
        require: true
    },
    Description:{
        type:string,
        require: true
    },
    //skills
    skills:{
        type:string,
        require: true
    }
    })
    module.exports = new mongoose.model("UserProfaile", UserProfaileSchema)
const mongoose = require("mongoose");

const UserProfaileSchema = new mongoose.Schema({
        //Persoanl
        userid:{
            type: String
        },
        username: {
        type: String,
        ref: 'user'
      },
    email: {
        type: String,
        require: true,
        unique:true
    },
    emailToken: {
        type: String,
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
        type:String,
        require: true
    },
    Educationlevel:{
        type:String,
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
        Type:String,
        require: true
    },
    Country:{
        type:String,
        require: true
    },    
    //Company And Experiences 
    CompanyName:{
        type:String,
        require: true
    },
    Field:{
        type:String,
        require: true
    },
    Jobtitle:{
        type:String,
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
        type:String,
        require: true
    },
    Exp_Country:{
        type:String,
        require: true
    },

    // Certificate or Course
    COCName:{
        type:String,
        require: true
    },
    NameOfDonor:{
        type:String,
        require: true
    },
    ObtainedDate:{
        type:Date,
        default: Date.now
    },
    Field:{
        type:String,
        require: true
    },
    Description:{
        type:String,
        require: true
    },
    //skills
    skills:{
        type:String,
        require: true
    }
    }
    );
   const UserProfaile= new mongoose.model("UserProfaile", UserProfaileSchema);
   module.exports =UserProfaile;
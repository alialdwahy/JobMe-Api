const mongoose = require("mongoose");

const UserProfaileSchema = new mongoose.Schema({
        //Persoanl
        userid:{
            type: String
        },
    email: {
        type: String,
        require: true,
        unique:true
    },
    emailToken: {
        type:String,
      },
    DateOfBirth:
    {
        type:String,
        required: [true, "Please add a Date Of Birth"],
        default: Date.now
    },  
     profilePicture: {
        type:String,
        default:"",
      },
      coins:
      {
       type:Number,
       default:0   
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
    Certificates:{
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
                type:String,
                default: Date.now
            },
            Ed_EndDate:{
                type:String,
                default: Date.now
            },
            Appreciation:{
                Type:String      
            }
    },    

            country:{
                type:String,
                require: true
            },
    //Company And Experiences 
    experience:{

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
                 equire: true
            },
            Wo_StartDate:{
                type:String,
                default: Date.now
            },
            Wo_EndDate:{
                type:String,
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
    },
    // Certificate or Course
    Certificate:{
            COCName:{
                type:String,
                require: true
             },
            NameOfDonor:{
                type:String,
                require: true
             },
            ObtainedDate:{
                type:String,
                default: Date.now
            },
            CoField:{
                type:String,
                require: true
            },
            Description:{
                type:String,
                require: true
            }
    },
    //skills
    skills:{
        type:String,
        require: true
    },  verified: {
        type: Boolean,
        default: false 
      }
    },
    { timestamps: true }
    );
   const UserProfaile= new mongoose.model("UserProfaile", UserProfaileSchema);
   module.exports =UserProfaile;
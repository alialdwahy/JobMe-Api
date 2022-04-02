const router = require('express').Router();
const Users = require('../models/user');
const Userprofile = require('../models/userprofile');
const config = require("../config/config");
const nodemailer = require("nodemailer");
let middleware = require("../config/middleware");
const crypto = require('crypto');
//
const multer = require("multer");
const path = require("path");
//...............................................................//
//..................................Auth Email Application..............................................//
//......................................................................................................//
var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,// true for 465, false for other ports
    auth: {
        user: 'bel7alal.kw@outlook.com', // generated ethereal user
        pass: 'NajaHcom72$'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  ///..........................................profile image........................................................

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb) => {

      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})


const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  fileFilter: fileFilter,
});

  //......................................................................................................//
//................................................REGISTER..............................................//
//......................................................................................................//
router.post("/register",upload.single("profilePicture"), async (req, res) =>
 {
    try 
    {
            //..........................Create New User
      const newUser = new Userprofile({
      userid: req.body.userid ,
      email: req.body.email,
      Gender:req.body.gender,
      country:req.body.country,
      DateOfBirth:req.body.DateOfBirth,
      Otherinformation:req.body.Otherinformation,
      EducationName:req.body.EducationName,
      Specialization:req.body.Specialization,
      Educationlevel:req.body.Educationlevel,
      Ed_StartDate:req.body.Ed_StartDate,
      Ed_EndDate:req.body.Ed_EndDate,
      Appreciation:req.body.Appreciation,
      CompanyName:req.body.CompanyName,
      Field:req.body.Field,
      Jobtitle:req.body.Jobtitle,
      Wo_StartDate:req.body.Wo_StartDate,
      Wo_EndDate:req.body.Wo_EndDate,
      JobDescription:req.body.JobDescription,
      Exp_Country:req.body.Exp_Country,
      COCName:req.body.COCName,
      NameOfDonor:req.body.NameOfDonor,
      ObtainedDate:req.body.ObtainedDate,
      CoField:req.body.Field,
      Description:req.body.Description,
      skills:req.body.skills,
      profilePicture:req.file.path,
      emailToken:crypto.randomBytes(64).toString('hex'),
      });
  
      //.....................................Save User and Respond
      const user = await newUser.save();
  
  //................................................Send Email Verification..............................................//
  
      let mailOptions = {
        from: '"تاكيد البريد الالكتروني"<bel7alal.kw@outlook.com>', // sender address
        to: user.email, // list of receivers
        subject: ' تطبيق وظفني', // Subject line
        text: ' ', // plain text body
        html: `<h2> ${user.email} </h2>
        <h4.يمكنك تجاهل هذا البريد اذا لم تطلب تاكيد بريدك</h2>
        <a href = "http://${req.headers.host}/auth/verify-email?token=${user.emailToken}">تأكيد البريد الالكتروني</a>
        <h4>شكرا</h2>
        <h4>فريق عمل </h2>`
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      return  res.render('contact', {msg:'تم ارسال البريد الالكتروني'});
  });
    return  res.status(200).json({
        statusCode:200,
        status:true,
          msg: "تم إرسال بريد إلكتروني إلى حسابك يرجى التحقق",
      });
    } 
    catch (err) {
     return res.status(400).send({
        statusCode:400,
        status:false,
        msg:err+ "موجود مسبقا",})
    }
  });

  router.get('/verify-email',async(req,res)=>{
    try{
      const token = req.query.Token
      const user = await Userprofile.findOne({emailToken:token})
      if(user){
        user.emailToken = null
        user.verified = true
        await user.save()
       return res.redirect('https://behalal.herokuapp.com/confirmation-email')
      }else{
         res.redirect('https://behalal.herokuapp.com/not-confirmation-email')
        console.log('لم يتم التحقق من البريد الإلكتروني')
      }
    }
    catch(err){
      console.log(err)
    }
  });
  

  router.get("/findprofile/:userid",middleware.checkAuthorization, async (req, res) => {
    try {
      const user = await Userprofile.findOne({userid:req.params.userid});
        if (!user) {
          return res.status(500).json({
            statusCode:500,
            status:false,
            msg:err+ "خطأ",})
        }
        return res.status(200).send({
          statusCode:200,
          status:true,
          msg: "تم التسجيل بنجاح",
          data: user,
        });
    
    } catch (err) {
      res.status(500).json({
        status:false,
        statusCode:404,
        msg: "لم يتم العثور",
      });
    }
  });

  router.put('/updateprofile/:userid',middleware.checkAuthorization,upload.single("profilePicture"),  async (req, res)=> {
    try {
      await Users.findOneAndUpdate({_id: req.params.userid},{username: req.body.username }).exec();
      await Userprofile.findOneAndUpdate({userid: req.params.userid},{
        email: req.body.email,
        Gender:req.body.gender,
        country:req.body.country,
        DateOfBirth:req.body.DateOfBirth,
        Otherinformation:req.body.Otherinformation,
        EducationName:req.body.EducationName,
        Specialization:req.body.Specialization,
        Educationlevel:req.body.Educationlevel,
        Ed_StartDate:req.body.Ed_StartDate,
        Ed_EndDate:req.body.Ed_EndDate,
        Appreciation:req.body.Appreciation,
        CompanyName:req.body.CompanyName,
        Field:req.body.Field,
        Jobtitle:req.body.Jobtitle,
        Wo_StartDate:req.body.Wo_StartDate,
        Wo_EndDate:req.body.Wo_EndDate,
        JobDescription:req.body.JobDescription,
        Exp_Country:req.body.Exp_Country,
        COCName:req.body.COCName,
        NameOfDonor:req.body.NameOfDonor,
        ObtainedDate:req.body.ObtainedDate,
        CoField:req.body.Field,
        Description:req.body.Description,
        skills:req.body.skills,
        profilePicture:req.file.path

      })
      return res.status(200).json({statusCode:200,status:true,msg:"تم التعديل"})
  } catch (err) {
      return res.status(400).json({statusCode:400,status:false,msg:"خطاء"})
  }
  });


//adding and update profile image
router
.route("/add/image/:userid")
.patch(middleware.checkAuthorization,upload.single("profilePicture"),async(req, res) => {
  
  await  Userprofile.findOneAndUpdate(
      { userid:req.params.userid},
      {
        $set: {
          profilePicture: req.file.path
        },
      },
      { new: true },
      (err, Userprofile) => {
        if (err){ return res.status(500).send({ statusCode:500,status:false,msg:"فشل التحديث"});}
        const { profilePicture} = Userprofile._doc; 
        const response = {
          statusCode:200,
          status:true,
          message: "تم تحديث الصورة بنجاح",
        };
        return res.status(200).send(response);
      }
    );
  });


module.exports = router;  
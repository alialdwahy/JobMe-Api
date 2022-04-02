const router = require('express').Router();
const Users = require('../models/user');
const Companys = require('../models/companyprofile');
const config = require("../config/config");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
let middleware = require("../config/middleware");

//

const multer = require("multer");
const path = require("path");



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
    cb(new err("select image  .png or jpeg"), false);
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
  router.post("/coprofile", middleware.checkAuthorization, upload.single("profilePicture"),  async (req, res) => {
    try {
      //..........................Create New profile
      const newCompany = new Companys ({
     // _id:req.body.userid,
      userid:req.body.userid,
      email:req.body.email,
      Employment:req.body.Employment,
      EstablishmentDate:req.body.EstablishmentDate,
      CompanySize:req.body.CompanySize,
      OtherInformation:req.body.OtherInformation,
      Country:req.body.Country,
      City:req.body.City,
      NumberOfEmploy:req.body.NumberOfEmploy,
      profilePicture:req.file.path

   //   emailToken:crypto.randomBytes(64).toString('hex')
    });

    //.....................................Save Company and Respond
    const Company = await newCompany.save();

//................................................Send Email Verification..............................................//

   let mailOptions = {
     from: '"تاكيد البريد الالكتروني"<bel7alal.kw@outlook.com>', // sender address
     to: Company.email, // list of receivers
     subject: ' تطبيق وظفني', // Subject line
      text: ' ', // plain text body
       html: `<h2> ${Company.email} </h2>
       <h4.يمكنك تجاهل هذا البريد اذا لم تطلب تاكيد بريدك</h2>
       <a href = "http://${req.headers.host}/auth/verify-email?token=${Company.emailToken}">تأكيد البريد الالكتروني</a>
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
      msg:"لم يتم التسجيل"})
  }
});


//...................................................Verification Email...................................
router.get('/verify-email', middleware.checkAuthorization,async(req,res)=>{
  try{
    const token = req.query.token
    const Company = await Companys.findOne({emailToken:token})
    if(Company){
      Company.emailToken = null
      Company.verified = true
      await Company.save()
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
//...................................Find user profile.....................................
router.get("/findprofile/:userid",middleware.checkAuthorization,  async (req, res) => {
  try {
    const user1 = await Users.findOne({_id:req.params.userid});
    const Company = await Companys.findOne({userid:req.params.userid});
         if (!Company || !user1) {
        return res.status(500).json({
          statusCode:500,
          status:false,
          msg: "خطأ",})
      }
      return res.status(200).send({
        statusCode:200,
        status:true,
        msg: "تم التسجيل بنجاح",
        data: Company,
        data1:user1,
      });
  
  } catch (err) {
    res.status(500).json({
      status:false,
      statusCode:404,
      msg:err+"لم يتم العثور",
    });
  }
});

//...........................................update user profile.....................................
router.put('/updateprofile/:userid',middleware.checkAuthorization, upload.single("profilePicture"),  async (req, res)=> {
  try {
    await Users.findOneAndUpdate({_id: req.params.userid},{username: req.body.username }).exec();
    await Companys.findOneAndUpdate({userid: req.params.userid},{     
      email:req.body.email,
      Employment:req.body.Employment,
      EstablishmentDate:req.body.EstablishmentDate,
      CompanySize:req.body.CompanySize,
      OtherInformation:req.body.OtherInformation,
      Country:req.body.Country,
      City:req.body.City,
      NumberOfEmploy:req.body.NumberOfEmploy,
      profilePicture:req.file.path
      
    })
    return res.status(200).json({statusCode:200,status:true,msg:"تم التعديل"})
} catch (err) {
    return res.status(400).json({statusCode:400,status:false,msg:err+"خطاء"})
}
});


//adding and update profile image
router.put("/add/image/:userid",middleware.checkAuthorization,upload.single("profilePicture"),async(req, res) => {
  try{
  await  Companys.findOneAndUpdate(
      {
         userid:req.params.userid 
      },
      {
        profilePicture:req.file.path
     
    }
  );
  }catch (err) {
    return res.status(400).json({statusCode:400,status:false,msg:err+"خطاء"})
}
});

//....................................................coins................................................

router.put('/coinst/:userid',middleware.checkAuthorization,  async (req, res)=> {
 await  Companys.updateone({userid:req.params.userid},
    {
      $inc:{
        coins:-d
      }
    })
.then((res) => {
return res.status(200).send({statusCode:200,status:true,msg:"تمت العملية"})
}).catch((err)=>{
return res.status(500).send({ statusCode:500,status:false,msg:"فشل التحديث"})
})
})
module.exports = router;

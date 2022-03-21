const router = require('express').Router();
const User = require('../models/user');
const Userprofile = require('../models/userprofile');
const config = require("../config/config");
const nodemailer = require("nodemailer");
let middleware = require("../config/middleware");
const crypto = require('crypto');



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
  //......................................................................................................//
//................................................REGISTER..............................................//
//......................................................................................................//
router.post("/register", async (req, res) => {
    try {
            //..........................Create New User
      const newUser = new Userprofile({
      userid: req.body.id ,
      username: req.body.username,
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
    } catch (err) {
     return res.status(400).send({
        statusCode:400,
        status:false,
        msg:err+"موجود مسبقا"})
    }
  });



  router.get("/findprofile", middleware.checkAuthorization, async (req, res) => {
    try {
      const user = await Userprofile.findone(
       {userid:req.body.userid});
        if (!user) {
          return res.status(500).json({
            statusCode:500,
            status:false,
            msg: "خطأ",})
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
        msg:err+"لم يتم العثور",
      });
    }
  });
module.exports = router;
  
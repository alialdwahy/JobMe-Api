const router = require('express').Router();
const User = require('../models/user');
const Company = require('../models/companyprofile');
const config = require("../config/config");
const nodemailer = require("nodemailer");


//......................................................................................................//
//..................................Auth Email Application..............................................//
//......................................................................................................//
var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,// true for 465, false for other ports
    auth: {
        user: 'Email@@', // generated ethereal user
        pass: 'pass'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  router.post("/coprofile", async (req, res) => {
    try {
      //..........................Create New profile
      const newCompany = new Company({
      Coname: req.body.username,
      email: req.body.email,
      Employment:req.body.Employment,
      EstablishmentDate:req.body.EstablishmentDate,
      CompanySize:req.body.CompanySize,
      OtherInformation:req.body.OtherInformation,
      Country:req.body.Country,
      City:req.body.City,
      NumberOfEmploy:req.body.NumberOfEmploy,
      emailToken:crypto.randomBytes(64).toString('hex'),
    });

    //.....................................Save Company and Respond
    const Company = await newCompany.save();

//................................................Send Email Verification..............................................//

    let mailOptions = {
      from: '"تاكيد البريد الالكتروني"<Email@@>', // sender address
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
   return res.send({
      statusCode:400,
      status:false,
      msg:"موجود مسبقا"})
  }
});
module.exports = router;

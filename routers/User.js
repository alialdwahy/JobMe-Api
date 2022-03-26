
const router = require('express').Router();
const User = require('../models/user');
const config = require("../config/config");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');



router.post("/register", async (req, res) => {
      try {
            //..........................Generate New Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            //..........................Create New User
            const newUser = new User({
              username: req.body.username,
              password: hashedPassword,
            });
        
            //.....................................Save User and Respond
            const user = await newUser.save(); 
           return  res.status(200).json({
          statusCode:200,
          status:true,
          data:user,
          msg: "تم التسجيل",
           });
          }

 catch (err) {
 return res.send({
    statusCode:400,
    status:false,
    msg:"موجود مسبقا"})
}
});
router.post("/login", async (req, res) => {
      try {
        const user = await User.findOne( {
          username: req.body.username 
           
            
        });
        if(!user){
         return res.status(404).json({status:false,msg:"لم يتم العثور على المستخدم", statusCode:404,
        });
        }
      const validPassword = await bcrypt.compare(req.body.password, user.password)
    if( !validPassword){
     return res.status(404).json({status:false,statusCode:404,msg:"كلمة المرور أو بريد إلكتروني خاطئ",})
    } 
        let token = jwt.sign({ email: req.body.email }, config.key, {});
        const { password, ...others } = user._doc;  
        return res.status(200).json({
          statusCode:200,
          status:true,
          data:{...others, token},
            msg: "تم التسجيل بنجاح",
        });
      }
       catch (err) {
       return res.status(500).json({
          status:false,
          statusCode:500,
          });
      }
    });

    router.put('/update-user-balance', async (req, res, next) => {
      try {
        const { user_id, amount } = req.body;
    
        if (!user_id || !amount){
          console.log('ERROR: "user_id" and "amount" data are required.');
          return res.status(400).json({ success: false });
        }
        
        await User.findOneAndUpdate(
          { _id: user_id },
          { $inc: { coins: amount * -1 },
        });
        
        console.log('User balance successfully updated')
        return res.status(200).json({ success: true });
      } catch (error) {
        console.log('ERROR: ', error);
        return res.status(400).json({ success: false });
      }
    });

module.exports = router;

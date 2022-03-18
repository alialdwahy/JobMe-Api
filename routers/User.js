
const  express = require('express');
const User = require('../models/User');
var bcrypt = require('bcrypt');


const router = express.Router()

router.post("/register", async (req, res) => {
      try {
            //..........................Generate New Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            //..........................Create New User
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword,
            
            });

            const user = await newUser.save();

return  res.status(200).json({
    statusCode:200,
    status:true,
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

module.exports = router;

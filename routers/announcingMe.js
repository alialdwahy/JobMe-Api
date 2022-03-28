const router = require('express').Router();
const User = require('../models/user');
const AnnouncingMe = require('../models/announcingMyself');
let middleware = require("../config/middleware");
const JobFilter = require("../utils/jobFilter");




  router.post("/", async (req, res) => {
    try {
      const newAnnouncingMe = new AnnouncingMe({
      titleJob: req.body.titleJob,
      jobDescirption:req.body.jobDescirption,
      userid:req.body.userid,
      });
      const announcingMe = await newAnnouncingMe.save();

return  res.status(200).json({
  statusCode:200,
  status:true,
  data:announcingMe,
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
//user  user
router.put("/:userid",async  (req, res) => {
  try{
    const announcingMe = await AnnouncingMe.findOneAndUpdate(
      { userid: req.params.userid },
      {
        $set: {
            titleJob: req.body.titleJob,
            jobDescirption:req.body.jobDescirption,
            
        },
      },
      { new: true },
    );
        return res.status(200).send({
          statusCode:200,
          status:true,
          msg: "تم تحديث المستخدم بنجاح",
          data:announcingMe,
        });
      }catch(err){
        return res.status(500).send({ statusCode:500,status:false,msg:"فشل التحديث"});   
      }
});

  //delete user
  router.delete("/:id",middleware.checkAuthorization, async (req, res) => {
   try {
     
    await AnnouncingMe.findOneAndDelete({_id: req.params.id});
    return res.status(200).json({status:true,statusCode:200,msg:"تم حذف الحساب"});
  } catch (err) {
     res.status(500).json({status:false,msg:"فشل حذف الحساب"});
  }

  return res.status(403).json({status:true,msg:"يمكنك حذف حسابك فقط!"});
  });
  
  //get a user with pagenation 
  router.get("/GetAllannoucing",async (req, res) => {
    try {
      let {page , size } = req.query
      if(!page){
        page =1
      }
      if (!size){
        size = 10;
      }
      const limit = parseInt(size)

      const skip = (page -1)*size;
      
      const announcingMe =  await AnnouncingMe.find({},{},{limit:limit,skip:skip}).populate('userid'); 
     return res.status(200).json({
          status:true,
          statusCode:200,
          data:announcingMe,
          msg:'تم بنجاح'
      });
    } catch (err) {
      res.status(404).json({ 
        status:false,
        statusCode:404,
        date:"لم يتم العثور ",});
    }
  });
  //get a user by id
  router.get("/annoucing/:id", async (req, res) => {
    try {

      const announcingMe =  await AnnouncingMe.find({userid: req.params.id}).populate('userid'); 
     return res.status(200).json({
          status:true,
          statusCode:200,
          data:announcingMe, 
          msg:'تم بنجاح'
      });
    } catch (err) {
      res.status(404).json({ 
        status:false,
        statusCode:404,
        msg:"لم يتم العثور",});
    }
  });
  //get a user with pagenation 
  router.get("/filter/annoucing", async (req, res) => {
    try {
      const {page = 1, limit = 50} = req.query;
      const findJob = new JobFilter(AnnouncingMe.find().populate('userid'),req.query)
      .search()
      .filter()
      .pageination();

      const announcingMe = await findJob.query;

      const total = await AnnouncingMe.countDocuments();
      const pages = Math.ceil(total/Number(limit));

      if (Number(page) > pages) {
        res.json({
          status:false,
          statusCode:404,
          msg:"لم يتم العثور على صفحة"
        })
      }

     return res.status(200).json({
          status:true,
          statusCode:200,
          data:announcingMe,
          totalUser:total,
          count:announcingMe.length,
          page,
          msg:'تم بنجاح'
      });
    } catch (err) {
      res.status(404).json({ 
        status:false,
        statusCode:404,
        msg:"لم يتم العثور",});
    }
  });
  module.exports = router;
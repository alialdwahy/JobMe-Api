const router = require('express').Router();
const User = require('../models/user');
const JobAdvertisement = require('../models/jobAdvertisement');
let middleware = require("../config/middleware");
const JobFilter = require("../utils/jobFilter");




  router.post("/", middleware.checkAuthorization, async (req, res) => {
    try {
      
        const newJobAdvertisement = new JobAdvertisement({
            userid:req.body.userid,
            titleJob: req.body.titleJob,
            jobDescirption:req.body.jobDescirption,
            requirements:req.body.requirements,
            gendar:req.body.gendar,
            workTime:req.body.workTime, 
            });
            const jobAdvertisement = await newJobAdvertisement.save();

return  res.status(200).json({
  statusCode:200,
  status:true,
  data:jobAdvertisement,
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
router.put("/:id",middleware.checkAuthorization, async  (req, res) => {
  try{
        const jobAdvertisement = await JobAdvertisement.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
                titleJob: req.body.titleJob,
                jobDescirption:req.body.jobDescirption,
                requirements:req.body.requirements,
                gendar:req.body.gendar,
                workTime:req.body.workTime, 
            },
          },
          { new: true },
        );
            return res.status(200).send({
              statusCode:200,
              status:true,
              msg: "تم تحديث المستخدم بنجاح",
              data:jobAdvertisement,
            });
          }catch(err){
            return res.status(500).send({ statusCode:500,status:false,msg:"فشل التحديث"});   
          }
});

  //delete user
  router.delete("/:id",middleware.checkAuthorization, async (req, res) => {

    try {
        await JobAdvertisement.findOneAndDelete({_id: req.params.id});
        return res.status(200).json({status:true,statusCode:200,msg:"تم حذف الحساب"});
      } catch (err) {
         res.status(500).json({status:false,msg:"فشل حذف الحساب"});
      }
  
      return res.status(403).json({status:true,msg:"يمكنك حذف حسابك فقط!"});
    
  });
  
  //get a user with pagenation 
  router.get("/GetAlloffer", middleware.checkAuthorization, async (req, res) => {
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

      const jobAdvertisement =  await JobAdvertisement.find({},{},{limit:limit,skip:skip}).populate('userid'); 
     return res.status(200).json({
          status:true,
          statusCode:200,
          data:jobAdvertisement,
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
  router.get("/offer/:id", middleware.checkAuthorization, async (req, res) => {
    try {

      const jobAdvertisement =  await JobAdvertisement.find({userid: req.params.id}).populate('userid'); 
     return res.status(200).json({
          status:true,
          statusCode:200,
          data:jobAdvertisement, 
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
  router.get("/filter/offer", middleware.checkAuthorization, async (req, res) => {
    try {
      const {page = 1, limit = 50} = req.query;
      const findJob = new JobFilter(JobAdvertisement.find().populate('userid'),req.query)
      .search()
      .filter()
      .pageination();

      const jobAdvertisement = await findJob.query;

      const total = await JobAdvertisement.countDocuments();
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
          data:jobAdvertisement,
          totalUser:total,
          count:jobAdvertisement.length,
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
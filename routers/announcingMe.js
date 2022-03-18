const router = require('express').Router();
const User = require('../model/user');
const AnnouncingMe = require('../models/announcingMyself');
var bcrypt = require('bcrypt');
 var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
let middleware = require("../config/middleware");
const UserFilter = require("../utils/userFilter");
const config = require("../config/config");



  router.post("/announcingMe", async (req, res) => {
    try {
      
        req.body.createdBy = req.user.userId
        const announcingMe = await AnnouncingMe.create(req.body)

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
//update user
router.put("/:id", middleware.checkAuthorization,async  (req, res) => {
  try{
    const {
        body: { titleJob, jobDescirption },
        user: { userId },
        params: { id: jobId },
      } = req
    
      if (titleJob === '' || jobDescirption === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }
      const announcingMe = await AnnouncingMe.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }

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
        const {
            user: { userId },
            params: { id: jobId },
          } = req
        
          const job = await AnnouncingMe.findByIdAndRemove({
            _id: jobId,
            createdBy: userId,
          })
          if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`)
          }
        return res.status(200).json({status:true,statusCode:200,msg:"تم حذف الحساب"});
      } catch (err) {
         res.status(500).json({status:false,msg:"فشل حذف الحساب"});
      }
  
      return res.status(403).json({status:true,msg:"يمكنك حذف حسابك فقط!"});
    
  });
  
  //get a user with pagenation 
  router.get("/GetAllUser", middleware.checkAuthorization, async (req, res) => {
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

      const announcingMe =  await AnnouncingMe.find({},{},{limit:limit,skip:skip}); 
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
  router.get("/GetAllUser/:id", middleware.checkAuthorization, async (req, res) => {
    try {

      const announcingMe =  await AnnouncingMe.find({_id: req.params.id}); 
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
  router.get("/GetAllUse", middleware.checkAuthorization, async (req, res) => {
    try {
      const {page = 1, limit = 50} = req.query;
      const findJob = new JobFilter(AnnouncingMe.find(),req.query)
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
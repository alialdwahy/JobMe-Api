const express = require('express');
const app = express();
require('dotenv').config();
const server = require('http').createServer(app);
const userRouter = require('../routers/user');
const announcingMeRouter = require('../routers/announcingMe');
const jobAdvertisementRouter = require('../routers/jobAdvertisement');
const cors = require("cors");

// var port_number = ;
const PORT = process.env.PORT || 4000
app.use("/uploads", express.static("./uploads/images"));
app.use(express.json())
app.use(cors());
app.use('/user',userRouter);
app.use('/annoucingMe',announcingMeRouter);
app.use('/jobAdvertisement',jobAdvertisementRouter);



app.get('/',(req,res) =>{
    res.send('Welcome JobMe');
});

server.listen(PORT);

module.exports = server;
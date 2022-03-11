const express = require("express");
require('dotenv').config();
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")
const errorHandler = require("./middlewares/error")
const fileUpload = require("express-fileupload")
const path = require("path")
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit')
const cors = require('cors')



const app = express()
app.use(cookieParser());
//dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//body parser middleware
app.use(express.json())

//File Uploading
app.use(fileUpload())

//sanitize data and prevent nosql injection
app.use(mongoSanitize())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter) // Apply the rate limiting middleware to all requests
app.use(cors()) //for cross origin resource security
app.use(express.static(path.join(__dirname, "public")))

//mount routers
//error handler middleware
app.use(errorHandler)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
      console.log(`Database Connected`)
    );
  } catch (error) {
    console.log(error);
  }
};
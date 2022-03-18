const jwt = require("jsonwebtoken");
const config = require("./config");

const checkAuthorization = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

      token = req.headers.authorization.split(" ")[1]
  }
      console.log(token);
      if (token) {
        jwt.verify(token, config.key, (err, decoded) => {
          if (err) {
            return res.json({
              status: false,
              statusCode:401,
              msg: "token is invalid",
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.json({
          status: false,
          statusCode:401,
          msg: "Token is not provided",
        });
      }
    };
  
module.exports = { checkAuthorization };
const paytabs = require('paytabs')
paytabs.ValidateSecretKey("aligowi358@gmail.com", "", function(response){
  console.log(response);
});
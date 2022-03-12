const mongo = require('mongoose');
const baseURL = 'mongodb+srv://gowi:paris055866@cluster0.x4jpf.mongodb.net/JobmeTest?retryWrites=true&w=majority';
mongo.connect(process.env.MONGODB_URI || baseURL).then((db)=>{
    console.log('Connected MONGODB');
}).catch((error)=> console.log('Not Connected'));


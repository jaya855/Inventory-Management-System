const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const dbconnect = async ()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log("db connected successfully");
    }
    catch(error){
        console.log("db connection failed");
    }
}

module.exports=dbconnect;
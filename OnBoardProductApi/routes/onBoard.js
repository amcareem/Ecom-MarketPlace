require('dotenv').config();
var express =   require('express');
var mongoose =  require('mongoose');
var router =  express.Router();


mongoose.connect(process.env.MongoUrl,{useNewUrlParser :  true},mongoose.set('strictQuery',true)).then(()=>{
    console.log("connected");}).catch((err)=>{console.log(err);})
module.exports = router;
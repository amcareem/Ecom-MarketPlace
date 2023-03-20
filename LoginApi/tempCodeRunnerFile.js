const express = require('express');
const dotenv = require('dotenv').config();
const app = express();


app.get("/api",(req,res) =>{
    res.json({
        success: 1,
        message: "this rest api working"
    });
});

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is up and running : ", process.env.APP_PORT);
});
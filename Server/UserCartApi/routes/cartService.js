require('dotenv').config();
const express = require('express');
const router =  express.Router();
const mysqlDb  = require('mysql');

//database connection
const db = mysqlDb.createConnection({
    
    host : process.env.host,
    port :"3306",
    user : process.env.user,
    password: process.env.password+"##++",
    database: process.env.database

});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else
        console.log("connected mysql")
})

//store item in a cart
router.post('/addToCart',(req,res)=>{
    const {productId,uuid,productName,productPrice,productAmount} = req.body;
    console.log('INSERT INTO cart (productId, uuid ,productName, productPrice, productAmount) VALUES ('+productId+','+ '"'+ uuid+'"'+','+ '"'+ productName+'"'+','+productPrice+','+ productAmount+')');
    db.query('INSERT INTO cart (productId, uuid ,productName, productPrice, productAmount) VALUES ('+productId+','+ '"'+ uuid+'"'+','+ '"'+ productName+'"'+','+productPrice+','+ productAmount+')',(err,result)=>{
        if(err)
            res.send(err);
        else{
            console.log(result.insertId)
            res.send('saved');
        }
              });
});

//get cart details
router.get('/getCartDetails/:id',(req,res)=>{
    var uuid =  req.params.id;
    db.query('select * from cart where uuid ='+uuid,(err,result)=>{
            if(err)
                res.send(err)
            else{
                console.log("working");
                res.send(result);
            }
        })
    
});



module.exports = router;